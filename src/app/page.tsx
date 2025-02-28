"use client";

import { useEffect } from "react";
import { getAccessToken } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (getAccessToken()) authService.checkAuth();
  }, [router]);

  return (
    <div></div>
  );
}