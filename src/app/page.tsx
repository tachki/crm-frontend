"use client";

import { useEffect } from "react";
import { getAccessToken } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";

export default function Home() {
  
  useEffect(() => {
    if (getAccessToken()) authService.checkAuth();
  }, []);

  return (
    <div></div>
  );
}
