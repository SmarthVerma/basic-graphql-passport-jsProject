'use client'
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_USER } from "../graphql/mutations";

// Define Zod schema for validation
const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export const Signup = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    // React Hook Form setup
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });

    // Apollo Mutation
    const [signup, { loading, error }] = useMutation(SIGNUP_USER);

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            await signup({ variables: data });
            navigate('/login'); // Redirect to login after successful signup
        } catch (err) {
            console.error('Signup error:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-all duration-300 hover:scale-105">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-600">
                            Role
                        </label>
                        <select
                            id="role"
                            {...register('role')}
                            onChange={(e) => setIsAdmin(e.target.value === 'ADMIN')}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                        {isAdmin && (
                            <div className="mt-2">
                                <label className="block text-sm text-red-500">
                                    Registering as an admin grants higher privileges. Proceed with caution.
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    {/* Mutation Error */}
                    {error && <p className="text-red-500 text-sm mt-4">{error.message}</p>}
                </form>

                {/* Link to Login */}
                <div className="mt-6 text-center text-sm">
                    <p>
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:text-blue-700">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};