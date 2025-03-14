import { Timestamp } from "firebase/firestore";
export interface AuthFormProps {
    confirmPassword: string;
    displayName: string;
    email: string;
    password: string;
}

export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export interface CreateUser extends User {
    createdAt: Timestamp;
    profilePicture: string;
}

export interface AuthContextType {
    isLoading: boolean;
    session: {
        token: string;
        user: User;
    } | null
    signIn: (value: AuthFormProps) => void;
    signOut: () => void;
    signUp: (value: AuthFormProps) => void;
}



export type AuthInputValueKey = "confirmPassword" | "email" | "displayName" | "password";