import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimeWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loodBeep";
import { TaskStateModel } from "../../models/TaskStateModel";



export type TaskContextProviderProps = {
    children: React.ReactNode;
}

export function TaskContextProvider( {children} : TaskContextProviderProps) {

    const [state, dispatch] = useReducer(taskReducer , initialTaskState, () => {
        const storageState = localStorage.getItem('state');

        if (storageState === null) return initialTaskState;

        const parseStorageState = JSON.parse(storageState) as TaskStateModel;

        return {
            ...parseStorageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00'
        };
    });
    const playBeepRef = useRef<ReturnType<typeof loadBeep>| null >(null) 

    const worker = TimeWorkerManager.getInstance();

    worker.onmessage(e => {
        const countDowSeconds = e.data

        if (countDowSeconds <= 0){
            if(playBeepRef.current){
                console.log('Tocando áudio...')
                playBeepRef.current();
                playBeepRef.current = null;
            }
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
        localStorage.setItem('state', JSON.stringify(state))    

        if(!state.activeTask){
            worker.terminate();
        }

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
         
        worker.postMessage(state)
     }, [worker, state])

     useEffect(() =>{
        if(state.activeTask && playBeepRef.current === null){
            playBeepRef.current = loadBeep();
        }else {
            playBeepRef.current = null;
        }
     }, [state.activeTask] )


    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}
