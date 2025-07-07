import { useContext } from "react";
import { StopwatchContext } from "./StopwatchContext";




export function useStopwatchContext() {

    return useContext(StopwatchContext);
}