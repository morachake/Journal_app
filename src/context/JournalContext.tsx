import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
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

const BASE_URL = 'http://127.0.0.1:8000/api/journal';

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
  const { isAuthenticated } = useAuth();

  const fetchJournals = async () => {
    const response = await fetch(`${BASE_URL}/entries/`);
    const data = await response.json();
    setJournalEntries(data);
  };

  const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories/`);
    const data = await response.json();
    setCategories(data);
  };

  const addJournal = async (entry: JournalEntry) => {
    const response = await fetch(`${BASE_URL}/entries/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    setJournalEntries([...journalEntries, data]);
  };

  const updateJournal = async (updatedEntry: JournalEntry) => {
    const response = await fetch(`${BASE_URL}/entries/${updatedEntry.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEntry),
    });
    const data = await response.json();
    setJournalEntries(prevEntries =>
      prevEntries.map(entry => (entry.id === data.id ? data : entry))
    );
  };

  const deleteJournal = async (id: number) => {
    await fetch(`${BASE_URL}/entries/${id}/`, {
      method: 'DELETE',
    });
    setJournalEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const addCategory = async (category: string) => {
    const response = await fetch(`${BASE_URL}/categories/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: category }),
    });
    const data = await response.json();
    setCategories([...categories, data]);
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
