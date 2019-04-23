import * as React from 'react';
import { TimePicker } from 'antd';
import { TimePickerProps } from 'antd/lib/time-picker';
import 'antd/lib/time-picker/style/css';
import { Moment } from 'moment';

interface OwnProps {
    name: string,
    defaultValue: Moment
}

type Props = OwnProps & TimePickerProps

export const FormTimePicker: React.FC<Props> = (props) => {
    const { name, defaultValue, ...pickerProps } = props;
    const [time, setTime] = React.useState(defaultValue.toString());
    const [open, setOpen] = React.useState(false);
    const handleChange = (moment: Moment, timeString: string) => {
        setOpen(false);
        setTime(timeString);
        if(props.onChange) {
            props.onChange(moment, timeString);
        }
    }
    return (
        <>
            <input name={name} type="number" hidden={true} value={time} />
            <TimePicker {...pickerProps}
                open={open}
                onOpenChange={setOpen}
                onChange={handleChange} />
        </>
    )
}