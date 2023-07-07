'use client';

import Container from '@/components/container';
import SignInForm from '@/components/forms/signIn/signin-form';
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignIn() {
  const router = useRouter();
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  return (
    <Container>
      <SignInForm />
    </Container>
  );
}
