import { createContext } from 'react';

export const AppContextDefault = { 
    name: '', 
    onExam: false,
    questions: [], 
    loading: false, 
    currentQuestion: 0
};

export const AppContext = createContext({});