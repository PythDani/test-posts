import type { User } from './User';

export type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
};
