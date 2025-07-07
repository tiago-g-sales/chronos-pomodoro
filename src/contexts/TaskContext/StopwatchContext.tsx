import { createContext } from "react";
import { StopwatchStateModel } from "../../models/TaskStateModel";
import { initialStopwatchState } from "./initialStopState";


export type StopwatchContextProps = {
    state: StopwatchStateModel;
    dispatch: React.Dispatch<StopwatchStateModel>;
}

export const initialContextValue = {
    state: initialStopwatchState,
    dispatch: () => {},

} 

export const StopwatchContext = createContext<StopwatchContextProps>(initialContextValue);
