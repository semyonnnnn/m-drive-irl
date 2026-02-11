import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  permissions: string[];
  roles: string[];
}

export type registerOrLoginType = 'register' | 'login' | null;

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
export type Permissions = {
    manageAdmins: string;
    manageUsers: string;
    assignTasks: string;
    completeTasks: string;
};

export type Role = {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
};

