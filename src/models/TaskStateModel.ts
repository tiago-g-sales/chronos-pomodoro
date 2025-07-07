import { TaskModel } from "./TaskModel"

export type TaskStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formattedSecondsRemaining: string;
    activeTask: TaskModel | null;
    currentCycle: number;
    config: {
        workTime: number; // em segundos
        shortBreakTime: number; // em segundos
        longBreakTime: number; // em segundos
    }
}

export type StopwatchStateModel = {
    tasks: TaskModel[];
    secondsRemaining: number;
    formattedHoursMinSeconds: string;
}