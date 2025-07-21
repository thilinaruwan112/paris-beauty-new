"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';

const SignupForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log({ fullName, email, password });
        window.location.href = '/login';
        setLoading(false);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-950/50 rounded-2xl shadow-2xl shadow-rose-200/50 dark:shadow-rose-900/50 p-8 md:p-12 border border-rose-100 dark:border-gray-800">
            <div className="flex flex-col items-center text-center mb-8">
                <Link href="/">
                    <Image
                        src="/assets/content/LogoHorizontal-optimized.png"
                        alt="Paris Beauty Logo"
                        width={120}
                        height={40}
                        className="mb-4"
                    />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Create Your Account</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Join us and discover your beauty.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                        required
                    />
                </div>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                        required
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                        required
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                        required
                    />
                </div>
                
                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 disabled:bg-pink-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                     {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Creating Account...</span>
                        </>
                    ) : (
                        <>
                            <span>Sign Up</span>
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-pink-600 hover:underline dark:text-pink-400">
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default SignupForm;
