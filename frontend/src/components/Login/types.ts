import { SxProps, Theme } from '@mui/material/styles';

export interface LoginStyles {
  rootContainer: SxProps<Theme>;
  innerBox: SxProps<Theme>;
  titleContainer: SxProps<Theme>;
  title: SxProps<Theme>;
  signUpLinkText: SxProps<Theme>;
  formBox: SxProps<Theme>;
  alert: SxProps<Theme>;
  inputStack: SxProps<Theme>;
  textField: SxProps<Theme>;
  submitButton: SxProps<Theme>;
  progressInButton: SxProps<Theme>;
  backgroundEffect: SxProps<Theme>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  [key: string]: string;
} 