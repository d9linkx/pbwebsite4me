'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EmailVerificationScreen } from '../../components/EmailVerificationScreen';
import { User } from '../../types';
import { useAuth } from '../../utils/apiHooks';
import { VerifyEmailResponse } from '../../types';
import { toast } from 'sonner';

export default function EmailVerificationPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');

  // Get user data from localStorage on component mount
  useEffect(() => {
    const pendingUserData = localStorage.getItem('pendingUser');
    if (pendingUserData) {
      try {
        const userData = JSON.parse(pendingUserData) as User;
        setUser(userData);
        setEmail(userData.email);
      } catch (error) {
        console.error('Error parsing pending user data:', error);
        // Redirect back to auth if no valid user data
        router.push('/auth');
      }
    } else {
      // Redirect back to auth if no pending user data
      router.push('/auth');
    }
  }, [router]);

  const handleBack = () => {
    // Clear pending user data and go back to auth
    localStorage.removeItem('pendingUser');
    router.push('/auth');
  };

  const handleVerified = (response: VerifyEmailResponse) => {
    // Clear pending user data
    localStorage.removeItem('pendingUser');

    // If verification successful and we have user data, log them in
    if (response.success && response.user) {
      router.push('/dashboard');
    } else if (response.token) {
      // If we have a token but no user data, try to get current user
      router.push('/dashboard');
    } else {
      // Verification failed, go back to auth
      router.push('/auth');
    }
  };

  const handleResendCode = async () => {
    // TODO: Implement resend verification code API call
    // This would call the backend to send a new verification code
    console.log('Resending verification code to:', email);
  };

  // Show loading or redirect if no user data
  if (!user || !email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-darker to-dark flex flex-col items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <EmailVerificationScreen
      email={email}
      onBack={handleBack}
      onVerified={handleVerified}
      onResendCode={handleResendCode}
    />
  );
}
