// DataContext.js
'use client'
import { createContext, useContext } from 'react';

const DataContext = createContext();

export function DataProvider({ data, children }) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}