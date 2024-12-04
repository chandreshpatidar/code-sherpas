import { ErrorMessage, useField } from 'formik';
import { Label } from '../ui/label';
import { FormikInputFieldProp } from './types';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const FormikInput = ({
  label,
  labelClassName,
  fieldClassName,
  type = 'text',
  name,
  placeholder,
  disabled = false,
  ...props
}: FormikInputFieldProp) => {
  const [field, meta] = useField(name);

  return (
    <div className='w-full flex flex-col gap-1.5'>
      <div className='inline-flex gap-1'>
        <Label className={cn('font-normal text-sm', labelClassName)}>{label}</Label>
      </div>
      <Input
        className={cn(meta.touched && meta.error && 'ring-red-200', fieldClassName)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        {...props}
      />
      <div className='h-3'>
        <ErrorMessage
          className='text-xs text-red-500'
          component='div'
          name={name}
        />
      </div>
    </div>
  );
};

export default FormikInput;
