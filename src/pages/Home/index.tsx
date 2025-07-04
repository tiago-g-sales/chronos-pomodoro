import { useEffect } from "react";
import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { TaskStateModel } from "../../models/TaskStateModel";
import { MainTemplate } from "../../templates/MainTemplate";

export type HomeProps = {
  state: TaskStateModel,
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}

export function Home() {

  useEffect(() => {
    document.title = 'Chronos Pomodoro';
  },[]);

  return (
    <MainTemplate>
        <Container>
            <CountDown />
        </Container>
        <Container>
            <MainForm  />
        </Container>
    </MainTemplate>
  );
}