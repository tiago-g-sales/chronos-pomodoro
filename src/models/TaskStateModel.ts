import { TaskModel } from "./TaskModel"

export type TaskStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formattedSecondsRemaining: string;
    activeTaskId: TaskModel | null;
    currentCycle: number;
    config: {
        workTime: number; // em segundos
        shortBreakTime: number; // em segundos
        longBreakTime: number; // em segundos
    }
}