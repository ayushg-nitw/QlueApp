import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationId, setVerificationId] = useState("");
  const [userMobile, setUserMobile] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        verificationId,
        setVerificationId,
        setUserMobile,
        userMobile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
