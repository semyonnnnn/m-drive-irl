// import { registerOrLoginType } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Define the shape of your context
type ContextType = {
    registerOrLogin: any;
    setRegisterOrLogin: (val: any) => void;
};

// 2️⃣ Create context with default value (or undefined)
const MyContext = createContext<ContextType | undefined>(undefined);

// 3️⃣ Create a provider component
type ProviderProps = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: ProviderProps) => {
    const [registerOrLogin, setRegisterOrLogin] = useState<any>(null);

    return (
        <MyContext.Provider value={{ registerOrLogin, setRegisterOrLogin }}>
            {children}
        </MyContext.Provider>
    );
};

// 4️⃣ Custom hook for consuming context
export const useAuthContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    return context;
};
