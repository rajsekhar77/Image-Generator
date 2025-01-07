import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const value = { user, setUser, showLogin, setShowLogin };

  // Providing context values to children
  return (
    <AppContext.Provider value={value}>
      {children} {/* children here is <App /> */}
    </AppContext.Provider>
  );
};
