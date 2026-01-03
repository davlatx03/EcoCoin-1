
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserRole, Submission, SubmissionStatus, Transaction, 
  Sponsor, VolunteerApplication 
} from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  submissions: Submission[];
  setSubmissions: React.Dispatch<React.SetStateAction<Submission[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  sponsors: Sponsor[];
  setSponsors: React.Dispatch<React.SetStateAction<Sponsor[]>>;
  volunteers: VolunteerApplication[];
  setVolunteers: React.Dispatch<React.SetStateAction<VolunteerApplication[]>>;
  
  // Actions
  addSubmission: (imageUrl: string, description: string) => void;
  approveSubmission: (id: string, coins: number) => void;
  rejectSubmission: (id: string) => void;
  assignCoins: (userId: string, amount: number, reason: string) => void;
  addSponsor: (sponsor: Omit<Sponsor, 'id'>) => void;
  removeSponsor: (id: string) => void;
  applyVolunteer: (app: Omit<VolunteerApplication, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'ecocoin_v1_data';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ecocoin_darkMode');
    return saved === 'true';
  });

  // Initial Data
  const [users, setUsers] = useState<User[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      setUsers(parsed.users || []);
      setSubmissions(parsed.submissions || []);
      setTransactions(parsed.transactions || []);
      setSponsors(parsed.sponsors || [
        { id: '1', name: 'GreenEarth', logo: 'https://picsum.photos/seed/green/100/100', description: 'Global reforestation project', website: 'https://example.com' },
        { id: '2', name: 'CleanOceans', logo: 'https://picsum.photos/seed/ocean/100/100', description: 'Removing plastic from the seas', website: 'https://example.com' }
      ]);
      setVolunteers(parsed.volunteers || []);
    } else {
      // Seed initial admin
      setUsers([{
        id: 'admin_1',
        username: 'davlatbekdev',
        email: 'admin@ecocoin.com',
        role: UserRole.ADMIN,
        balance: 0
      }]);
    }
  }, []);

  // Persistence
  useEffect(() => {
    const data = JSON.stringify({ users, submissions, transactions, sponsors, volunteers });
    localStorage.setItem(STORAGE_KEY, data);
  }, [users, submissions, transactions, sponsors, volunteers]);

  useEffect(() => {
    localStorage.setItem('ecocoin_darkMode', darkMode.toString());
  }, [darkMode]);

  const addSubmission = (imageUrl: string, description: string) => {
    if (!currentUser) return;
    const newSubmission: Submission = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      username: currentUser.username,
      imageUrl,
      description,
      status: SubmissionStatus.PENDING,
      createdAt: Date.now()
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const approveSubmission = (id: string, coins: number) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        assignCoins(s.userId, coins, `Eco-proof: ${s.description.substring(0, 20)}...`);
        return { ...s, status: SubmissionStatus.APPROVED, assignedCoins: coins };
      }
      return s;
    }));
  };

  const rejectSubmission = (id: string) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: SubmissionStatus.REJECTED } : s));
  };

  const assignCoins = (userId: string, amount: number, reason: string) => {
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      amount,
      reason,
      date: Date.now(),
      adminId: 'admin_1'
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, balance: u.balance + amount } : u));
    
    // Update current user if they are the recipient
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
    }
  };

  const addSponsor = (sponsor: Omit<Sponsor, 'id'>) => {
    const newSponsor: Sponsor = { ...sponsor, id: Math.random().toString(36).substr(2, 9) };
    setSponsors(prev => [...prev, newSponsor]);
  };

  const removeSponsor = (id: string) => {
    setSponsors(prev => prev.filter(s => s.id !== id));
  };

  const applyVolunteer = (app: Omit<VolunteerApplication, 'id' | 'createdAt'>) => {
    const newApp: VolunteerApplication = {
      ...app,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setVolunteers(prev => [newApp, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      darkMode, setDarkMode,
      submissions, setSubmissions,
      users, setUsers,
      transactions, setTransactions,
      sponsors, setSponsors,
      volunteers, setVolunteers,
      addSubmission, approveSubmission, rejectSubmission,
      assignCoins, addSponsor, removeSponsor, applyVolunteer
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within AppProvider');
  return context;
};
