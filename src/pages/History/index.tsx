import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { TaskStateModel } from "../../models/TaskStateModel";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from './styles.module.css';
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";


export type HomeProps = {
  state: TaskStateModel,
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}

export function History() {

  const {state, dispatch} = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  //const sortedTaks = sortTasks({tasks: state.tasks})

  const hasTasks = state.tasks.length > 0;

  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(() => {
    return {
      tasks: sortTasks({tasks: state.tasks}),
      field: 'startDate',
      direction: 'desc'
    }
  })


  useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState, 
      tasks: sortTasks({
        tasks: state.tasks, 
        direction: prevState.direction, 
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    if(!confirmClearHistory) return
    setConfirmClearHistory(false)

    dispatch({type: TaskActionTypes.RESET_STATE}) 

  }, [confirmClearHistory, dispatch])

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    }
  }, [])



  function handleSortTasks({field}: Pick<SortTasksOptions, 'field'> ){
    const newDirection = sortTaskOptions.direction === 'desc' ? 'asc' : 'desc'

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection, 
        tasks: sortTaskOptions.tasks, 
        field,
      }),
      direction: newDirection,
      field,
    })
  }

  function handleResetHistory(){
    showMessage.dismiss();
    showMessage.confirm('Tem Certeza?', (confirmation) => {
      setConfirmClearHistory(confirmation)
    })

  }


  return (
    <MainTemplate>
        <Container>
          <Heading>
            <span>
              History
            </span>
            {hasTasks && (
              <span className={styles.buttonContainer} >
                <DefaultButton icon={<TrashIcon />} 
                color="red"
                aria-label="Apagar todo o histórico"
                title="Apagar histórico"
                onClick={handleResetHistory}
                />
              </span>
            )}
          </Heading>
        </Container>
        <Container>
          {hasTasks && (
          <div className={styles.responsiveTable}>  
            <table>
              <thead>
                <tr>
                  <th onClick={()=> handleSortTasks({field: 'name'})} className={styles.thSort}>
                    Tarefa ↕
                  </th>
                  <th onClick={()=> handleSortTasks({field: "duration"})} className={styles.thSort}>
                    Duração ↕
                  </th>
                  <th onClick={()=> handleSortTasks({field: 'startDate'})} className={styles.thSort}>
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map((task) => {
                  const taskTypeMap = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  }
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeMap[task.type]}</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
          ) }
          {!hasTasks && (
             <p style={{textAlign: 'center', fontWeight:'bold'}}>Ainda não tarefas criadas.</p> 
          )}
        </Container>
    </MainTemplate>
  );
} 