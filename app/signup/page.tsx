import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Account | Paris Beauty',
    description: 'Sign up for a Paris Beauty account to enjoy a personalized shopping experience and faster checkout.',
};

const SignupPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-rose-50/50 dark:bg-gray-900 flex items-center justify-center p-4">
            <SignupForm />
        </div>
    );
};

export default SignupPage;
