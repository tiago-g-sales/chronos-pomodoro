
import { useStopwatchContext } from '../../contexts/TaskContext/useStopwatchContext';
import styles from './styles.module.css'




export function CountUP( ) {

  const {state} = useStopwatchContext();

  return (
    <div className={styles.container} >
      {state.formattedHoursMinSeconds}
    </div>
  )
}