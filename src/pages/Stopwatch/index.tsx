import {    SquarePlay, TimerOffIcon, TimerResetIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { Heading } from "../../components/Heading";
import { StopwatchStateModel } from "../../models/TaskStateModel";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from './styles.module.css';
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"; 
import { useEffect, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { CountUP } from "../../components/CountUP";


export type StopwatchProps = {
  state: StopwatchStateModel,
  setState: React.Dispatch<React.SetStateAction<StopwatchStateModel>>;
}

export function Stopwatch() {

  useEffect(() => {
    document.title = 'Cronômetro - Chronos Pomodoro';
  },[]);

  const {dispatch} = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  //const sortedTaks = sortTasks({tasks: state.tasks})

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


  return (
    <MainTemplate>
        <Container>
          <Heading>
            <span>
              Cronômetro
            </span>
          </Heading>
        </Container>
        <Container>
            <CountUP />
        </Container> 
        <Container>
          <div className={styles.containerBotoes}>
            <span className={styles.buttonContainer}>
              <DefaultButton 
                icon={<SquarePlay/>} 
                aria-label='Inicia cronômetro'  
                title='Iniciar cronômetro'
              /> 
            </span>   


             <span className={styles.buttonContainer}>
              <DefaultButton 
                icon={<TimerOffIcon/>} 
                aria-label='Parar cronômetro'  
                title='Parar cronômetro'
              /> 
            </span>  

             <span className={styles.buttonContainer}>
              <DefaultButton  
                icon={<TimerResetIcon/>} 
                aria-label='Reiniciar cronômetro'  
                title='Reiniciar cronômetro'
              /> 
            </span>
          
          </div>  
          <div className={styles.responsiveTable}>  
            <table>
              <thead>
                <tr>
                  <th className={styles.thSort}>
                    Tarefa ↕
                  </th>
                  <th className={styles.thSort}>
                    Duração ↕
                  </th>
                  <th  className={styles.thSort}>
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>          
                <tr key='1'>
                  <td>blabla</td>
                  <td>blabla</td>
                  <td>blabla</td>
                  <td>blabla</td>
                  <td>blabla</td>
                </tr>
              </tbody>
            </table>
          </div>

        </Container>
    </MainTemplate>
  );
} 