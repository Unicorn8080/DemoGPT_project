import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useContext,
} from "react";

import { useRouter } from "next/router";

interface User {
  name?: string;
  email?: string;
  token?: string;
}

interface IAuthContext {
  login: (userData: User) => void;
  logout: () => void;
  user: User | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  login: () => {},
  logout: () => {},
  user: null,
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem('token')
    console.log(router.pathname)
    // const storedUser = '{"name":"as", "email": "df"}';
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedToken) {

    } else if (router.pathname === '/') {
      console.log('😀');
    } else {
      router.push("/dashboard/login");
      // console.log(router.pathname);
    }
  }, [router.pathname]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
