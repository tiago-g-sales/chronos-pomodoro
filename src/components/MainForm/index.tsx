import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";


export function MainForm( ) {

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para criar uma nova tarefa
  }


    return (
        <form onSubmit={handleCreateNewTask} className='form' action=""> 
        <div className='formRow'>
          <DefaultInput labelText='task' id='meuInput' type='text' placeholder='Digite algo'/>
        </div>
        
        <div className='formRow'>
          <p>Próximo intervalo é de 25 min </p>
        </div>   

        <div className='formRow'>
          <Cycles/>
        </div>

        <div className='formRow'>
          < DefaultButton icon={< PlayCircleIcon />}/>
        </div>  
      </form> 
    );
}