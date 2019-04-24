import { createGlobalStyle } from 'styled-components'
import { PRIMARY_COLOR } from './constants';

export const GlobalStyle = createGlobalStyle`
    * { padding: 0; margin: 0; border: 0; } 
    .ant-input, .ant-dropdown-trigger, .ant-calendar-date, .ant-btn {
        &:focus, &:hover {
        color: ${PRIMARY_COLOR} !important;
        border-color: ${PRIMARY_COLOR} !important;
        }
    }
    .ant-calendar-today-btn {
        color: ${PRIMARY_COLOR} !important;
    }
    .ant-calendar-today .ant-calendar-date {
        color: ${PRIMARY_COLOR} !important;
        border-color: ${PRIMARY_COLOR} !important;
    }
    .ant-dropdown-menu-item:hover, .ant-calendar-selected-date .ant-calendar-date {
        background-color: ${PRIMARY_COLOR} !important;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`