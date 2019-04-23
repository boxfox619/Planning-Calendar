import * as React from 'react';
import * as moment from 'moment';
import { getFormData } from '../utils/formUtil';
import { DatePicker, Input, Button, Modal, Form } from 'antd';
import 'antd/lib/input/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/button/style/css';
import { Task, TaskCreateRequest } from '../models/Task';
import { range } from 'lodash';
import { FormTimePicker } from './FormTimePicker';

interface Props {
    task?: Task
    time?: moment.Moment,
    onOk: (task: TaskCreateRequest) => void
    onCancel: () => void,
    onDelete: () => void
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export const TaskModal: React.FC<Props> = (props: Props) => {
    const { task, time, onOk, onCancel, onDelete } = props;
    const defaultDate = task ? moment(task.date) : (time ? moment(time) : moment());
    const [date, setDate] = React.useState(defaultDate);
    const [startHour, setStartHour] = React.useState(defaultDate);
    const [endHour, setEndHour] = React.useState(defaultDate.clone().add(1, 'h'));
    const handleSubmit = (e: React.FormEvent) => {
        onOk(getFormData<TaskCreateRequest>(e));
    };
    const disabledHours = () => range(0, startHour.hour()+1);
    const footer = [
        <Button key="back" htmlType="submit" form="task-form">확인</Button>,
        <Button key="cancel" onClick={onCancel}>취소</Button>
    ]
    if (task) {
        footer.push(<Button key="delete" onClick={onDelete}>삭제</Button>);
    }

    return (
        <Modal title={task ? '일정 수정' : '일정 추가'}
            footer={footer}
            visible={true}>
            <Form id="task-form" {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item label="Task Name" >
                    <Input name="name" defaultValue={task ? task.name : ''} required={true} />
                </Form.Item>
                <Form.Item label="Start Date Time" >
                    <DatePicker allowClear={false} name="date" value={date} onChange={setDate} />
                    <FormTimePicker name="startHour" allowClear={false} defaultValue={startHour} format={'HH'} onChange={setStartHour} />
                </Form.Item>
                <Form.Item label="End Date Time" >
                    <DatePicker allowClear={false} open={false} name="date" value={date} />
                    <FormTimePicker name="endHour" allowClear={false} defaultValue={endHour} format={'HH'} disabledHours={disabledHours} onChange={setEndHour} />
                </Form.Item>
            </Form>
        </Modal>
    )
}