
export interface JournalEntry {
    id: number;
    title: string;
    content: string;
    category: number;
    category_name: string;
    date: string;
  }
  
  
 export  interface JournalItemProps {
    id: number;
    title: string;
    content: string;
    category_name: string;
    date: string;
    expanded: boolean;
    onToggleExpand: (id: number) => void;
    onEdit: () => void;
    onDelete: (id: number) => void;
  }

  export interface Category {
    id: number;
    name: string;
  }
  
  export interface AddCategoryModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (category: string) => void;
  }
  
 
  export interface JournalContextType {
    journalEntries: JournalEntry[];
    categories: Category[];
    fetchJournals: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    addJournal: (journal: JournalEntry) => Promise<void>;
    updateJournal: (journal: JournalEntry) => Promise<void>;
    deleteJournal: (id: number) => Promise<void>;
  }
  
  export interface AuthContextType {
    user : User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (username: string, email: string, password: string) => Promise<void>;
    editProfile: (username: string, email: string, password: string) => Promise<void>;
    getAccessToken: () => Promise<string | null>;
  }
  
 export  interface User {
    username: string;
    email: string;
  }
  