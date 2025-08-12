'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
export const SideBarContext = createContext({
  collapsed: false,
  setCollapsed: (value: boolean) => {},
  toggleCollapsed: () => {},
  drawerOpened: false,
  setDrawerOpened: (value: boolean) => {},
  toggleDrawer: () => {},
});
export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  // TODO: save state to local storage
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };
  const toggleDrawer = () => {
    setDrawerOpened((prev) => !prev);
  };
  return (
    <SideBarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        drawerOpened,
        setDrawerOpened,
        toggleDrawer,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBarProvider = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error('useSideBar must be used within a SideBarProvider');
  }
  return context;
};
