import React, { useContext, useMemo } from "react";

const Context = React.createContext({});

function UsersProvider({ children }) {
  const value = useMemo(() => ({}), []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useUsersContext() {
  return useContext(Context);
}

export { UsersProvider, useUsersContext };
