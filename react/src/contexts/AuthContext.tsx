import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Tambahkan ini
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
    // Simpan token atau status auth ke localStorage atau cookie jika diperlukan
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Hapus token atau status auth dari localStorage atau cookie jika diperlukan
    localStorage.removeItem('userToken');
  };

  // Periksa status autentikasi saat aplikasi dimuat
  React.useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
