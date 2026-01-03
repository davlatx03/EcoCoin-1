
export enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  balance: number;
}

export interface Submission {
  id: string;
  userId: string;
  username: string;
  imageUrl: string;
  description: string;
  status: SubmissionStatus;
  createdAt: number;
  assignedCoins?: number;
  reviewerId?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  date: number;
  adminId: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  country: string;
  motivation: string;
  createdAt: number;
}
