import { Participation, User } from '@/types';

const STORAGE_KEYS = {
  PARTICIPATIONS: 'participations',
  USERS: 'users'
} as const;

// Initialize default admin user
const initializeUsers = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultAdmin: User = {
      username: 'MO',
      password: 'tmp123',
      role: 'admin'
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([defaultAdmin]));
  }
};

export const getParticipations = (): Participation[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PARTICIPATIONS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveParticipation = (participation: Participation): void => {
  const participations = getParticipations();
  participations.push(participation);
  localStorage.setItem(STORAGE_KEYS.PARTICIPATIONS, JSON.stringify(participations));
};

export const updateParticipation = (id: string, updates: Partial<Participation>): void => {
  const participations = getParticipations();
  const index = participations.findIndex(p => p.id === id);
  if (index !== -1) {
    participations[index] = { ...participations[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PARTICIPATIONS, JSON.stringify(participations));
  }
};

export const deleteParticipation = (id: string): void => {
  const participations = getParticipations();
  const filtered = participations.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PARTICIPATIONS, JSON.stringify(filtered));
};

export const getUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsers();
  return users.find(user => user.username === username && user.password === password) || null;
};

// Initialize storage
initializeUsers();