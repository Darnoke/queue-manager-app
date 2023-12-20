import { createContext, useContext, useState, ReactNode } from 'react';
import { Category } from '../models/Category';

interface CategoryContextProps {
  categories: Category[];
  updateCategories: (newCategories: Category[]) => void;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const updateCategories = (newCategories: Category[]) => {
    setCategories([...newCategories]);
  };

  const contextValue: CategoryContextProps = {
    categories,
    updateCategories,
  };

  return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>;
};

export const useCategoryContext = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider');
  }
  return context;
};
