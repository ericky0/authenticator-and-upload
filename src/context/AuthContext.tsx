import { useState } from "react";
import { useContext } from "react";
import { createContext, useCallback } from "react";
import history from '../utils/History'
import api from '../services/api'


interface AuthContextState{
    token: TokenState;
    signIn({email, password}: UserData): Promise<void>;
    signOut(): void;
    userLogged(): boolean;  
}

interface UserData{
    email: string,
    password: string
}

interface TokenState{
    token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context;
}



const AuthProvider: React.FC = ({ children }) => {

    const [token, setToken] = useState<TokenState>(() => {
        const token = localStorage.getItem('@PermissionYT:token');

        if(token) {
            api.defaults.headers.authorization = `Bearer ${token}`
            return { token };
        } 
        
        return { } as TokenState;
    });

    const signIn = useCallback(async ({email, password}:UserData) => {
        const response = await api.post(('/auth'), {
            email,
            password
        });

        const { token } = response.data;

        setToken(token);
        
        localStorage.setItem("@PermissionYT:token", token);
    }, []);

    const signOut = useCallback(() => {
        localStorage.clear();
        history.push('/');
    }, []);

    const userLogged = useCallback(() => {
        const token = localStorage.getItem('@PermissionYT:token');
        if(token){
            return true;
        } else {
            return false;
        }
        
    }, []);

    return(
        <AuthContext.Provider value={{ token, signIn, userLogged, signOut }}>
            {children}
        </AuthContext.Provider>
    )
};

export { useAuth, AuthProvider };