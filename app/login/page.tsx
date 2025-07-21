import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Paris Beauty',
    description: 'Log in to your Paris Beauty account to access your orders, wishlist, and more.',
};

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-rose-50/50 dark:bg-gray-900 flex items-center justify-center p-4">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
