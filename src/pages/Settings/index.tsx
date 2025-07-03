import { SaveIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { DefaultButton } from "../../components/DefaultButton";
import { DefaultInput } from "../../components/DefaultInput";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";

import styles from './styles.module.css';
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function Settings() {

  const {state} = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakInput = useRef<HTMLInputElement>(null);
  const longBreakInput = useRef<HTMLInputElement>(null);

  

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const workTime = workTimeInput.current?.value;
    const shortBreakTime = shortBreakInput.current?.value;
    const longBreakTime = longBreakInput.current?.value;

    console.log(workTime, shortBreakTime, longBreakTime)


  }

  return (
    <MainTemplate>
        <Container>
          <Heading>Configurações</Heading>
        </Container>
        <Container>
          <p style={{textAlign: 'center'}}>
            Modifique as configurações para tempo de foco, descanso curto e descanso longo.  
          </p>
        </Container>
        <Container>
          <form onSubmit={handleSaveSettings} action='' className={styles.form}>
            <div className={styles.formRow}>
              <DefaultInput 
              id='workTime' 
              labelText='Foco' 
              ref={workTimeInput}
              defaultValue={state.config.workTime}
              /> 
            </div>
            <div className={styles.formRow}>
              <DefaultInput 
              id='shortBreakTime' 
              labelText='Descanso curto' 
              ref={shortBreakInput}
              defaultValue={state.config.shortBreakTime}
              /> 
            </div>
            <div className={styles.formRow}>
              <DefaultInput 
              id='longBreakTime' 
              labelText='Descanso longo' 
              ref={longBreakInput}
              defaultValue={state.config.longBreakTime}
              /> 
            </div>  
            <div className={styles.formRow}>
              <DefaultButton 
                icon={<SaveIcon/>} 
                aria-label='Salvar configurações'  
                title='Salvar configurações'
              /> 
            </div>                                      
          </form>

        </Container>
    </MainTemplate>
  );
}