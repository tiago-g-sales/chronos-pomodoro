
import { Container } from './components/Container';
import { Logo } from './components/Logo';

import './styles/theme.css'
import './styles/global.css'
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';
import { DefaultInput } from './components/DefaultInput';
import { Cycles } from './components/Cycles';


export function App() {
  return (
    <>
    <Container>
      <Logo/>
    </Container>
    <Container>
      <Menu/>
    </Container>
    <Container>
      <CountDown/>
    </Container>
    <Container>
      <form className='form' action=""> 
        <div className='formRow'>
          <DefaultInput labelText='Task' id='meuInput' type='text' placeholder='Digite algo'/>
        </div>
        
        <div className='formRow'>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>   

        <div className='formRow'>
          <Cycles/>
        </div>

        <div className='formRow'>
          <button type='submit'>Enviar</button>
        </div>  
      </form> 
    </Container>

    </>
  );}