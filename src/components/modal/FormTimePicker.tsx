import * as React from 'react';
import { TimePicker } from 'antd';
import { TimePickerProps } from 'antd/lib/time-picker';
import 'antd/lib/time-picker/style/css';
import { Moment } from 'moment';

interface OwnProps {
    name: string,
}

type Props = OwnProps & TimePickerProps

export const FormTimePicker: React.FC<Props> = (props) => {
    const { name, ...pickerProps } = props;
    const [time, setTime] = React.useState(props.value ? props.value.hour() : '');
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => props.value && setTime(props.value.hour()), [props.value])
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value);
    const handleChange = (moment: Moment, timeString: string) => {
        setOpen(false);
        setTime(timeString);
        if(props.onChange) {
            props.onChange(moment, timeString);
        }
    }
    return (
        <>
            <input name={name} type="string" hidden={true} value={time} onChange={handleTextChange} />
            <TimePicker {...pickerProps}
                open={open}
                onOpenChange={setOpen}
                onChange={handleChange} />
        </>
    )
}