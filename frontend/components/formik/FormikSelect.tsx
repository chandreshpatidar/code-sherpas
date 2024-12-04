import { ErrorMessage, useField } from 'formik';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FormikSelectProps } from './types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const FormikSelect = ({
  placeholder = '',
  options,
  name,
  className,
  label,
  labelClassName,
  disabled = false,
}: FormikSelectProps) => {
  const [open, setOpen] = useState(false);
  const [field, meta, helpers] = useField({ name: name });

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='inline-flex gap-1'>
        <Label className={cn('font-normal text-sm', labelClassName)}>{label}</Label>
      </div>

      <Select
        onValueChange={(value) => {
          if (value) helpers.setValue(value);
        }}
        disabled={disabled}
        {...field}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTrigger className={cn({ 'ring-red-200': meta.touched && meta.error }, className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent sideOffset={10}>
          {options.map((option) => {
            return (
              <SelectItem
                value={option.value}
                key={option.value}
              >
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

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

FormikSelect.displayName = 'FormikSelect';
export default FormikSelect;
