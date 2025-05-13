'use client';

import { AuthProvider } from "@/context/AuthContext";
import ReduxProvider from "@/components/ReduxProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <SessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SessionProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}