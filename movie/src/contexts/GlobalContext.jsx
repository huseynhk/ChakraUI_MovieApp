import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");
  

  const contextValue = {
    activePage,
    setActivePage,
    totalPages,
    setTotalPages,
    sortBy,
    setSortBy,
    isLoading,
    setIsLoading,
  };
  const Component = GlobalContext.Provider;
  return <Component value={contextValue}>{children}</Component>;
};

const useGlobalContext = () => useContext(GlobalContext);
export { GlobalContextProvider, useGlobalContext };
