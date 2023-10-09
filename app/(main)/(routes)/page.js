'use client'

import RequestName from "@/components/request-name";
import { useEffect, useReducer } from "react";
import { AnimatePresence } from "framer-motion";
import { AppContext, AppContextDefault } from "@/providers/App.context";
import axios from 'axios'; 
import Loading from "@/components/loading";
import SidebarQuestions from "@/components/sidebar-questions";
import { useNotifications } from "rx-notifications";
import CurrentQuestion from "@/components/current-question";
import Finished from "@/components/finished";

const reducer = (state, action) => {
    const { type, payload } = action;

    if(type === 'SET_NAME') {
        return {
            ...state,
            name: payload
        }
    }

    if(type === 'SET_ON_EXAM') { 
        return {
            ...state, 
            onExam: payload
        }
    }

    if(type === 'SET_QUESTIONS') { 
        return {
            ...state, 
            questions: payload, 
            loading: false
        }
    }

    if(type === 'SET_LOADING') { 
        return {
            ...state, 
            loading: payload
        }
    }

    if(type === 'SET_CURRENT_QUESTION') { 
        return {
            ...state, 
            currentQuestion: payload
        }
    }

    if(type === 'NEXT_QUESTION') {
        return {
            ...state, 
            
            questions: state.questions.map((single, index) => {
                if(index == state.currentQuestion) {
                    return {
                        ...single, 
                        answered: true, 
                        correct: payload
                    }
                }
                
                return single; 
            }),

            currentQuestion: state.currentQuestion + 1, 
        }
    }

    if(type === 'FINALIZE_EXAM') {
        return {
            ...state, 
            questions: state.questions.map((single, index) => {
                if(index >= state.currentQuestion) {
                    return {
                        ...single, 
                        answered: true, 
                        correct: false
                    }
                }

                return single; 
            }),
            currentQuestion: state.questions.length,
        }
    }

    return state; 
}

export default function App() { 
    const [state, dispatch] = useReducer(reducer, AppContextDefault); 
    const maxQuestions = 10; 

    const {
        notificationCenter, addNotification
    } = useNotifications({
        position: 'bottom-right', 
        style: 'flex items-center hover:bg-blue-700 transition-all gap-3 justify-between bg-blue-500 text-white px-5 py-2.5 rounded'
    });

    useEffect(() => {
        if(!state.onExam) return; 

        fetchQuestions();
    }, [state.onExam])

    const fetchQuestions = async () => {
        dispatch({
            type: 'SET_LOADING', 
            payload: true
        })

        const { data } = await axios.get(`/api/questions?amount=${ maxQuestions }`);
        
        const { done, message, questions } = data;

        if(!done) {
            return console.log(message); 
        } 

        dispatch({
            type: 'SET_QUESTIONS', 
            payload: questions
        })
    }

    if(state.loading) return <Loading />

    return <div className="h-screen w-screen bg-white flex flex-wrap overflow-x-hidden overflow-y-hidden">
        <AnimatePresence>
            <AppContext.Provider value={{
                state, dispatch, addNotification
            }}>
                <RequestName />
                
                {
                    state.onExam && <div className="flex flex-col w-full">
                        <div className="w-full p-4 border-b flex justify-between items-center bg-gray-50">
                            <p className="flex items-center gap-3">
                                <span className="material-symbols-outlined">timer</span>

                                Next Contest
                            </p>

                            <button onClick={() => dispatch({
                                type: 'FINALIZE_EXAM'
                            })} className="text-blue-500 hover:text-blue-700 transition-all poppins">
                                Finalizar
                            </button>
                        </div>

                        <div className="flex-1 flex">
                            <div className="w-[300px] border-r flex flex-col px-4 bg-gray-50">
                                <SidebarQuestions />

                                <div className="py-4 text-blue-500 flex flex-wrap items-center gap-4">
                                    <div className="w-full h-[7px] bg-gray-200 rounded transition-all">
                                        <div className="h-full bg-blue-500 rounded" style={{
                                            width: `${ (state.currentQuestion / maxQuestions) * 100 }%`
                                        }}></div>
                                    </div>

                                    <span className="material-symbols-outlined">person</span>

                                    { state.name }
                                </div>
                            </div>

                            {
                                state.currentQuestion < maxQuestions ? <CurrentQuestion /> : <Finished />
                            }
                        </div>
                    </div>
                }

                { notificationCenter }
            </AppContext.Provider>
        </AnimatePresence>
    </div>
}


