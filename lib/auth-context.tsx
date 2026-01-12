"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  type User,
  type AuthState,
  type UserProfile,
  getAuthFromStorage,
  saveAuthToStorage,
  clearAuthFromStorage,
  login as authLogin,
  register as authRegister,
  getUserProfile,
} from "@/lib/auth";

interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getUserProfileData: () => UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Routes that require authentication
const protectedRoutes = ["/profile", "/kalkulator-waris", "/kelas"];

// Routes that are only for guests (redirect to home if logged in)
const guestOnlyRoutes = ["/login", "/register"];

// Admin-only routes
const adminRoutes = ["/dashboard"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();
  const pathname = usePathname();

  // Initialize auth state from storage
  useEffect(() => {
    const { user, isAuthenticated } = getAuthFromStorage();
    setAuthState({
      user,
      isAuthenticated,
      isLoading: false,
    });
  }, []);

  // Handle route protection
  useEffect(() => {
    if (authState.isLoading) return;

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isGuestOnlyRoute = guestOnlyRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isAdminRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isProtectedRoute && !authState.isAuthenticated) {
      // Redirect to login if trying to access protected route without auth
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isGuestOnlyRoute && authState.isAuthenticated) {
      // Redirect authenticated users away from guest-only routes
      if (authState.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      return;
    }

    if (
      isAdminRoute &&
      authState.isAuthenticated &&
      authState.user?.role !== "admin"
    ) {
      // Redirect non-admin users away from admin routes
      router.push("/");
      return;
    }
  }, [authState, pathname, router]);

  const login = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ success: boolean; error?: string }> => {
      const result = authLogin(email, password);

      if (result.success && result.user) {
        saveAuthToStorage(result.user);
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Redirect based on role
        if (result.user.role === "admin") {
          router.push("/dashboard");
        } else {
          // Check for redirect parameter
          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get("redirect");
          router.push(redirect || "/");
        }

        return { success: true };
      }

      return { success: false, error: result.error };
    },
    [router]
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      name: string;
      phone?: string;
    }): Promise<{ success: boolean; error?: string }> => {
      const result = authRegister(data);

      if (result.success && result.user) {
        saveAuthToStorage(result.user);
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        });

        router.push("/");
        return { success: true };
      }

      return { success: false, error: result.error };
    },
    [router]
  );

  const logout = useCallback(() => {
    clearAuthFromStorage();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    router.push("/");
  }, [router]);

  const getUserProfileData = useCallback((): UserProfile | null => {
    if (!authState.user) return null;
    return getUserProfile(authState.user.id);
  }, [authState.user]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        getUserProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// HOC for protected pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: { requireAdmin?: boolean }
) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }

      if (!isLoading && options?.requireAdmin && user?.role !== "admin") {
        router.push("/");
      }
    }, [isAuthenticated, isLoading, user, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    if (options?.requireAdmin && user?.role !== "admin") {
      return null;
    }

    return <Component {...props} />;
  };
}
