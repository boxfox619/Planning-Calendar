import * as React from 'react';
import * as moment from 'moment';
import { getFormData } from '../../utils/formUtil';
import { DatePicker, Input, Button, Modal, Form, Spin } from 'antd';
import 'antd/lib/spin/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/button/style/css';
import { Task } from '../../models';
import { FormTimePicker } from './FormTimePicker';
import { range } from 'lodash';

interface Props {
    target: Task | moment.Moment,
    isLoading: boolean,
    onOk: (task: Task) => void,
    onDelete: (id: number) => void,
    onCancel: () => void
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
    const { target, isLoading, onOk, onCancel, onDelete } = props;
    const time = (moment.isMoment(target)) ? target : undefined;
    const task = (!time) ? target as Task : undefined; 
    const defaultDate = task ? moment.parseZone(task.date) : (time ? time : moment());
    const defaultStartHour = task ? task.startHour : defaultDate.hour();
    const defaultEndHour = task ? task.endHour : defaultDate.clone().hour(defaultStartHour).add(1, 'h').hour();
    const [date, setDate] = React.useState(defaultDate);
    const [startHour, setStartHour] = React.useState(defaultStartHour);
    const [endHour, setEndHour] = React.useState(defaultEndHour);
    const onChangeStartTime = (hour: number) => {
        if (hour >= endHour) {
            const newEndHour = date.clone().hour(hour).add(1, 'h').hour();
            setEndHour(newEndHour === 0 ? 24 : newEndHour);
        }
        setStartHour(hour);
    }
    const handleSubmit = (e: React.FormEvent) => onOk(getFormData<Task>(e));
    const handleDelete = () => task && onDelete(task.id);
    const footer = <>
            <Button key="back" htmlType="submit" form="task-form" disabled={isLoading}>확인</Button>
            <Button key="cancel" onClick={onCancel} disabled={isLoading}>취소</Button>
            {task && <Button key="delete" onClick={handleDelete} disabled={isLoading}>삭제</Button>}
        </>
    return (
        <Modal title={task ? '일정 수정' : '일정 추가'}
            onCancel={onCancel}
            footer={footer}
            confirmLoading={isLoading}
            visible={true}>
            <Spin spinning={isLoading}>
                <Form id="task-form" {...formItemLayout} onSubmit={handleSubmit}>
                    <Form.Item label="Task Name" >
                        <Input name="name" defaultValue={task ? task.name : ''} required={true} />
                    </Form.Item>
                    <Form.Item label="Start Date Time" >
                        <DatePicker allowClear={false} name="date" value={date} onChange={setDate} />
                        <FormTimePicker name="startHour" value={startHour} disableHours={[24]} onChange={onChangeStartTime} />
                    </Form.Item>
                    <Form.Item label="End Date Time" >
                        <DatePicker allowClear={false} open={false} value={date}/>
                        <FormTimePicker name="endHour" value={endHour} disableHours={range(0, startHour + 1)} onChange={setEndHour} />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}