"use client";

import Container from "@/components/container";
import SignUpForm from "@/components/forms/signUp/signup-form";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return (
    <Container>
      <SignUpForm />
    </Container>
  );
}
