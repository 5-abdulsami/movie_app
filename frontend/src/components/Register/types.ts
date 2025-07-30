import { SxProps, Theme } from '@mui/material/styles';

export interface RegisterStyles {
  rootContainer: SxProps<Theme>;
  innerBox: SxProps<Theme>;
  titleContainer: SxProps<Theme>;
  title: SxProps<Theme>;
  signInLinkText: SxProps<Theme>;
  formBox: SxProps<Theme>;
  alert: SxProps<Theme>;
  inputStack: SxProps<Theme>;
  textField: SxProps<Theme>;
  submitButton: SxProps<Theme>;
  progressInButton: SxProps<Theme>;
  backgroundEffect: SxProps<Theme>;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  [key: string]: string;
}