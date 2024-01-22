"use client";

import { createContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    UserCredential,
    User,
} from "firebase/auth";
import { auth } from "@/config/firbase";

type Props = {
    children: React.ReactNode
}

interface AuthContextType {
    user: User | null,
    isUserAuth: boolean,
    isLoading: boolean,
    showAuthNote: boolean,
    createUserByEmail: (email: string, password: string) => Promise<UserCredential>,
    signInUserByEmail: (email: string, password: string) => Promise<UserCredential>,
    signOutUser: () => Promise<void>,
    setShowAuthNote: (status: boolean) => void,
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isUserAuth: false,
    isLoading: false,
    showAuthNote: false,
    createUserByEmail: async (email, password) => Promise.resolve({} as UserCredential),
    signInUserByEmail: async (email, password) => Promise.resolve({} as UserCredential),
    signOutUser: async () => Promise.resolve(),
    setShowAuthNote: (status) => {},
});


const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isUserAuth, setIsUserAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showAuthNote, setShowAuthNote] = useState<boolean>(true);
    
    const createUserByEmail = async ( email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUserByEmail = async ( email: string, password: string) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = async () => {
        return await signOut(auth);
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setIsLoading(true);

            if (user) {
                setUser(user);
                setIsUserAuth(true);
            } else {
                setIsUserAuth(false);
            }

            setIsLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isUserAuth,
            isLoading,
            showAuthNote,
            createUserByEmail,
            signInUserByEmail,
            signOutUser,
            setShowAuthNote,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

export { AuthProvider, AuthContext };