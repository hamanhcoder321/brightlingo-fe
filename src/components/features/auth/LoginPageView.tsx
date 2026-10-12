"use client";

import type { JSX } from "react";
import { Container } from "@/components/common/Container";
import { AuthForm } from "./AuthForm";

export function LoginPageView(): JSX.Element {
  return (
    <Container className="flex min-h-[calc(100vh-200px)] items-center justify-center py-10 sm:py-16">
      <AuthForm initialMode="login" />
    </Container>
  );
}

export default LoginPageView;
