import * as React from 'react';
import * as moment from 'moment';
import { getFormData } from '../libs/FormUtil';
import { DatePicker, Input, Button, Modal, Form, InputNumber } from 'antd';
import 'antd/lib/input/style/css';
import 'antd/lib/input-number/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/date-picker/style/css';
import 'antd/lib/button/style/css';
import { Task } from '../models/Task';

interface Props {
    task?: Task
    time?: moment.Moment,
    onOk: (task: Task) => void
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

    const handleSubmit = (e: React.FormEvent) => onOk(getFormData<Task>(e));

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
                    <Input name="name" required={true} />
                </Form.Item>
                <Form.Item label="Start Date Time" >
                    <DatePicker
                        name="date"
                        showTime={true}
                        placeholder="Select Time"
                        defaultValue={defaultDate} />
                </Form.Item>
                <Form.Item label="Duration Time" >
                    <InputNumber
                        required={true}
                        name="durationTime"
                        min={1} max={24} defaultValue={1} />
                </Form.Item>
            </Form>
        </Modal>
    )
}