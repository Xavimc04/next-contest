'use client'

import { useContext } from "react";
import { AppContext } from "../providers/App.context";
import { motion } from 'framer-motion'; 

export default function RequestName() {
    const { state, dispatch, addNotification } = useContext(AppContext);

    return <>
        { 
            state.onExam == false && <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="h-screen w-screen bg-white/20 flex items-center justify-center backdrop-blur-sm fixed"
            >
                <section className="w-[400px] flex flex-col">
                    <h2 className="flex items-center gap-3 text-xl poppins">
                        <span className="material-symbols-outlined text-blue-500">key</span>
                        
                        Please, enter your name
                    </h2>
        
                    <small className="mt-3 text-gray-500">The name you entered it's only used to customize your exam and display it on results table</small>
                
                    <input type="text" value={ state.name } onChange={(e) => dispatch({
                        type: "SET_NAME",
                        payload: e.target.value
                    })} className="w-full mt-5 border border-gray-400 focus:border-blue-500 focus:text-blue-500 transition-all rounded text-sm px-5 py-2" placeholder="Xavier Morell" />
                
                    <button onClick={() => {
                        if(state.name.length <= 0) return addNotification({
                            message: "Introduce un nombre válido", 
                            icon: 'close', 
                            color: 'white'
                        })

                        dispatch({
                            type: "SET_ON_EXAM",
                            payload: true
                        })
                    }} className="bg-blue-500 flex items-center text-white justify-center gap-3 py-2 poppins rounded text-sm mt-3">
                        <span className="material-symbols-outlined">send</span>
        
                        Continue as { state.name }
                    </button>
                </section>
            </motion.div>
        }
    </>
}