import { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

export function useToken() {
  return useContext(TokenContext);
}

export function TokenProvider({ children }) {
  const [token, setToken] = useState('');

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}