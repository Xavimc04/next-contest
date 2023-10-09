import { AppContext } from "@/providers/App.context"
import { useContext } from "react"
import axios from 'axios'
import { motion } from 'framer-motion'

export default function CurrentQuestion() {
    const { state, dispatch } = useContext(AppContext)

    const validateResponse = async (letter) => {
        axios.post('/api/questions', {
            question: state.questions[state.currentQuestion].question,
            letter
        }).then(({ data }) => {
            if(data.done) {
                dispatch({
                    type: 'NEXT_QUESTION',
                    payload: data.correct
                })
            }
        });
    }

    return state.questions[state.currentQuestion] && <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 h-full flex flex-col items-center justify-center"
    >
        <div className="w-[600px] flex flex-col justify-center">
            <h2 className="text-2xl poppins">{ state.questions[state.currentQuestion].question }</h2>

            <div className="flex flex-col gap-4 mt-10">
                {
                    state.questions[state.currentQuestion].available_responses.map((single, index) => {
                        return <button key={ index } className="flex items-center gap-5 border-b pb-5">
                            <div onClick={() => validateResponse(single.letter)} className="flex bg-blue-500 hover:bg-blue-700 transition-all rounded-full w-[40px] h-[40px] text-white justify-center items-center p-3">
                                { single.letter }
                            </div>

                            { single.response }
                        </button>
                    })
                }
            </div>
        </div>
    </motion.div>
}