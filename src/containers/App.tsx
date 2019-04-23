import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { CalendarController } from '../components/CalendarController';
import { CalendarMode } from '../models/CalendarMode';
import { Task, StoreModel } from '../models';
import { connect } from 'react-redux';
import { TaskModal } from '../components/modal/TaskModal';
import * as TaskAction from './../reducers/task/action';
import * as moment from 'moment';
import { Calendar } from './Calendar';
import {notification } from 'antd';
import styled from 'styled-components';
import 'antd/lib/notification/style/css';

const Container = styled.div`
  text-align: center;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

interface OwnProps {
  store: Store
}

const mapDispatchToProps = {
  loadTasks: TaskAction.loadTasks,
  createTask: TaskAction.createTask,
  editTask: TaskAction.editTask,
  deleteTask: TaskAction.deleteTask
};

const mapStateToProps = (state: StoreModel) => {
  return {
    taskStore: state.task
  }
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & OwnProps;

const App: React.FC<Props> = ({ store, taskStore, ...action }) => {
  const { tasks, isTaskUpdating, isTaskUpdated } = taskStore;
  const [currentMoment, setCurrentMoment] = React.useState(moment());
  const [calendarMode, setCalendarMode] = React.useState(CalendarMode.Month);
  const [selectedTarget, setSelectedTarget] = React.useState();
  const prevIsUpdating = React.useRef<boolean>();

  const handleDismissModal = () => setSelectedTarget(null);
  const handleUpdateTask = (newTask: Task) => {
    if (!selectedTarget) {
      return;
    } else if (moment.isMoment(selectedTarget)) {
      action.createTask(newTask);
    } else {
      action.editTask({ id: selectedTarget.id, ...newTask });
    }
  }

  React.useEffect(() => {
    if(taskStore.error){
      notification.error({
        message: taskStore.error.title,
        description: taskStore.error.description,
      });
    }
  }, [taskStore.error]);

  React.useEffect(() => {
    if (prevIsUpdating && !isTaskUpdating && isTaskUpdated) {
      handleDismissModal();
    }
    prevIsUpdating.current = isTaskUpdating;
  }, [isTaskUpdating, isTaskUpdated]);

  React.useEffect(() => {
    const req = { year: currentMoment.year(), month: currentMoment.month() + 1 };
    action.loadTasks(req);
  }, [currentMoment.month()]);

  return (
    <Provider store={store}>
      <Container>
        <CalendarController
          currentMoment={currentMoment}
          mode={calendarMode}
          onChangeMode={setCalendarMode}
          onChangeMoment={setCurrentMoment} />
        <Calendar
          style={{ flex: 1 }}
          currentMoment={currentMoment}
          mode={calendarMode}
          tasks={tasks}
          onSelect={setSelectedTarget}
          onUpdate={action.editTask}
        />
        {(selectedTarget) && (
          <TaskModal
            target={selectedTarget}
            isLoading={isTaskUpdating}
            onOk={handleUpdateTask}
            onCancel={handleDismissModal}
            onDelete={action.deleteTask} />
        )}
      </Container>
    </Provider>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(App);