import { AppContext } from "@/providers/App.context"
import { useContext } from "react"

export default function SidebarQuestions() {
    const { state } = useContext(AppContext)

    return <div className="flex flex-col flex-1 overflow-y-scroll">
        {
            state.questions.map((single, index) => {
                return <div key={ index } title={ single.question } className={ `text-ellipsis ${ 
                        state.questions[state.currentQuestion] && state.questions[state.currentQuestion].question == single.question ? 'text-blue-500' : 
                        state.questions[index].answered && state.questions[index].correct ? 'line-through text-green-500' : 
                        state.questions[index].answered ? 'line-through text-red-500' : 
                        'text-gray-600' 
                    } select-none cursor-pointer mt-5 truncate ...` }>
                    { single.question }
                </div>
            })
        }
    </div>
}