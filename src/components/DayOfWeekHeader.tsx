import * as React from 'react';
import styled from 'styled-components';
import { BORDER_COLOR, WEEK_DAYS } from '../common/constants';

const Header = styled.div`
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid ${BORDER_COLOR};
    & > * {
        flex: 1;
    }
`
type Props = React.HTMLAttributes<HTMLDivElement>;

export const DayOfWeekHeader: React.FC<Props> = (props) => {
    return (
        <Header {...props}>
            {WEEK_DAYS.map(name => (<div key={name}>{name}</div>))}
        </Header>
    )
}