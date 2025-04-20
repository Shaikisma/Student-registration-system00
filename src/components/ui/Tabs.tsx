import React, { createContext, useContext } from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within a TabsProvider');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      className={`${className} ${
        isActive 
          ? 'bg-black text-white font-medium shadow-sm' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-black'
      }`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
};

interface TabsProviderProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ value, onValueChange, children }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      {children}
    </TabsContext.Provider>
  );
};