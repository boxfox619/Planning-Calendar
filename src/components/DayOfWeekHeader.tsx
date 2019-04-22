import * as React from 'react';
import styled from 'styled-components';
import { BORDER_COLOR } from '../common/constants';

const Header = styled.div`
    display: flex;
    flex-flow: row;
    border-bottom: 1px solid ${BORDER_COLOR};
    & > * {
        flex: 1;
    }
`
const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];
type Props = React.HTMLAttributes<HTMLDivElement>;

export const DayOfWeekHeader: React.FC<Props> = (props: Props) => {
    return (
        <Header {...props}>
            {weekLabels.map(name => (<div key={name}>{name}</div>))}
        </Header>
    )
}