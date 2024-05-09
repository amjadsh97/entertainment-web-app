import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import dataJSON from "../data.json"
import {Video} from '../interfaces';

// Define the shape of your context
interface AppContextType {
  data: Video[];
  setData: React.Dispatch<React.SetStateAction<Video[]>>;
}

// Create the initial context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Create the AppProvider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [data, setData] = useState<Video[]>([]);

  // Function to set data from local storage
  const setDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      try {
        setData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    } else {
      // Local storage is empty, provide default data
      setData(dataJSON); // Replace defaultData with your actual default data
    }
  };

  useEffect(() => {
    setDataFromLocalStorage();
  }, []); // Run once on component mount


  const updateData = (newData: React.SetStateAction<Video[]>) => {
    setData(prevData => {
      const updatedData = typeof newData === 'function' ? newData(prevData) : newData;
      localStorage.setItem('data', JSON.stringify(updatedData));
      return updatedData;
    });
  };


  return (
    <AppContext.Provider value={{data, setData: updateData}}>
      {children}
    </AppContext.Provider>
  );
};
