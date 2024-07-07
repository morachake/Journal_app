import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: number;
  date: string;
}

interface Category {
  id: number;
  name: string;
}

interface JournalContextType {
  journalEntries: JournalEntry[];
  categories: Category[];
  addJournal: (entry: JournalEntry) => Promise<void>;
  updateJournal: (updatedEntry: JournalEntry) => Promise<void>;
  deleteJournal: (id: number) => Promise<void>;
  addCategory: (category: string) => Promise<void>;
  fetchJournals: () => Promise<void>;
  fetchCategories: () => Promise<void>;
}

const BASE_URL = 'http://localhost:8000/api/journal';

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

interface JournalProviderProps {
  children: ReactNode;
}

export const JournalProvider: React.FC<JournalProviderProps> = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated, getAccessToken } = useAuth();

  const getHeaders = async () => {
    const token = await getAccessToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchJournals = async () => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/entries/`, { headers });
    const data = await response.json();
    setJournalEntries(data);
  };

  const fetchCategories = async () => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/categories/`, { headers });
    const data = await response.json();
    setCategories(data);
  };

  const addJournal = async (entry: JournalEntry) => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/entries/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    console.log(data);
    setJournalEntries([...journalEntries, data]);
  };

  const updateJournal = async (updatedEntry: JournalEntry) => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/entries/${updatedEntry.id}/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updatedEntry),
    });
    const data = await response.json();
    setJournalEntries(prevEntries =>
      prevEntries.map(entry => (entry.id === data.id ? data : entry))
    );
  };

  const deleteJournal = async (id: number) => {
    const headers = await getHeaders();
    await fetch(`${BASE_URL}/entries/${id}/`, {
      method: 'DELETE',
      headers,
    });
    setJournalEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const addCategory = async (category: string) => {
    const headers = await getHeaders();
    const response = await fetch(`${BASE_URL}/categories/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: category }),
    });
    if (response.ok) {
      const data = await response.json();
      setCategories([...categories, data]);
    } else {
      const errorData = await response.json();
      console.error('Error adding category:', errorData);
      throw new Error('Failed to add category');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJournals();
      fetchCategories();
    }
  }, [isAuthenticated]);

  return (
    <JournalContext.Provider value={{
      journalEntries,
      categories,
      addJournal,
      updateJournal,
      deleteJournal,
      addCategory,
      fetchJournals,
      fetchCategories
    }}>
      {children}
    </JournalContext.Provider>
  );
};
