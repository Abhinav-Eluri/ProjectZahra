// This is a server component
import React from 'react';
import { LoginClient } from './LoginClient';

// These export options ensure the page is rendered at request time, not build time
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function LoginPage() {
  return <LoginClient />;
}
