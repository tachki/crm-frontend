'use client'

import { Provider } from "react-redux";
import Auth from "./auth/Auth";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAccessToken, getRefreshToken } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service"

const queryClient = new QueryClient();

export default function Home() {
  useEffect(() => {
    if (getAccessToken()) authService.checkAuth()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Auth />
      </Provider>
    </QueryClientProvider>
  );
}
