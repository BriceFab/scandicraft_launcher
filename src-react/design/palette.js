import { white, black, red, secondaryColor } from './colors';

export default {
  common: {
    black,
    white,
    neutral: '#E4E7EB',
    muted: '#9EA0A4'
  },
  primary: {
    contrastText: white,
    main: red,
    light: red,
    dark: secondaryColor  //hover
  },
  secondary: {
    contrastText: white,
    main: '#333333',
    light: '',
    dark: '#37248F'
  },
  success: {
    contrastText: white,
    main: '#45B880',
    light: '#F1FAF5',
    dark: '#00783E'
  },
  info: {
    contrastText: white,
    main: '#1070CA',
    light: '#F1FBFC',
    dark: '#007489'
  },
  warning: {
    contrastText: white,
    main: '#FFB822',
    light: '#FDF8F3',
    dark: '#95591E'
  },
  danger: {
    contrastText: white,
    main: '#ED4740',
    light: '#FEF6F6',
    dark: '#BF0E08'
  },
  text: {
    primary: '#12161B',
    secondary: white,
    disabled: '#A6B1BB'
  },
  background: {
    default: '#f8fafc',
    dark: '#172B4D',
    paper: white
  },
  border: '#DFE3E8',
  divider: '#DFE3E8'
};
