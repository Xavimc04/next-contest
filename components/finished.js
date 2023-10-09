import { AppContext } from "@/providers/App.context"
import { useContext, useEffect, useState } from "react"

export default function Finished() {
    const { state } = useContext(AppContext)
    const [correct, handleCorrect] = useState(0); 

    useEffect(() => {
        if (state.questions) {
            const correctCount = state.questions.filter(single => single.correct && single.answered).length;
            handleCorrect(correctCount || 0);
        }
    }, [])

    return <div className="flex-1 h-full flex flex-col items-center justify-center">
        <h2 className="text-4xl poppins">{ correct >= (state.questions.length / 2) ? 'Aprobado' : 'Suspendido' }</h2>
    </div>
}