import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimeWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";



export type TaskContextProviderProps = {
    children: React.ReactNode;
}

export function TaskContextProvider( {children} : TaskContextProviderProps) {

    const [state, dispatch] = useReducer(taskReducer , initialTaskState);

    const worker = TimeWorkerManager.getInstance();

    worker.onmessage(e => {
        const countDowSeconds = e.data

        if (countDowSeconds <= 0){
            dispatch({
                type: TaskActionTypes.COMPLETE_TASK, 
            });
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionTypes.COUNT_DOWN, 
                payload: {secondsRemaining: countDowSeconds}
            })
        }
    })

     useEffect(() => {

        console.log(state)

         if(!state.activeTask){
            console.log('Worker terminado por falta de activeTask');
            worker.terminate();
         }
         worker.postMessage(state)
     }, [worker, state])

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}
