import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

import {
  languageReducer,
  type State,
  type Action,
} from "../reducers/languageReducer";

// ========== Context Type ==========

type LanguageContextType = {
  language: State;
  dispatch: Dispatch<Action>;
};

// ========== Context ==========

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// ========== Initial State ==========

const initialLanguage: State = {
  direction: "rtl",
  name: "العربية",
};

// ========== Provider ==========

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, dispatch] = useReducer(languageReducer, initialLanguage);

  return (
    <LanguageContext.Provider value={{ language, dispatch }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ========== Custom Hook ==========

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
