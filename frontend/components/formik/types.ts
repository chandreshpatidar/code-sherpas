import { HTMLInputTypeAttribute } from 'react';

export interface FormikInputFieldProp extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  labelClassName?: string;
  fieldClassName?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  privacyText?: string;
  hintText?: string;
}

export interface FormikSelectProps {
  placeholder?: string;
  name: string;
  options: SelectOptions[];
  className?: string;
  label?: string;
  labelClassName?: string;
  disabled?: boolean;
  hintText?: string;
  autoFocus?: boolean;
}

export interface SelectOptions {
  value: string;
  label: string;
}
