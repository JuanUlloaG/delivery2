import React from 'react'
import AuthProvider from './AuthProvider';
import { Routes } from '../navigations/Routes';
import { ReduxProvider } from "./ReduxProvider";

interface ProviderProps {

}

export const Provider: React.FC<ProviderProps> = ({ }) => {
    return (
        <ReduxProvider>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ReduxProvider>
    );
}