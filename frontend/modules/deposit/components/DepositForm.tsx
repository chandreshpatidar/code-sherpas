'use client';
import React from 'react';
import { Form, Formik, FormikValues } from 'formik';
import FormikInput from '@/components/formik/FormikInput';
import { Button } from '@/components/ui/button';
import { depositFormValidationSchema } from '../validations/depositFormValidationSchema';
import { useAccountStore } from '@/modules/account/store/accountStore';
import { useToast } from '@/hooks/use-toast';

interface DepositFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const DepositForm: React.FC<DepositFormProps> = ({ onCancel, onSuccess }) => {
  const { deposit } = useAccountStore();
  const { showSuccessToast, showErrorToast } = useToast();

  const onSubmit = async (values: FormikValues) => {
    const body = { amount: Number(values.amount) };
    const error = await deposit(body);

    if (error?.message) {
      showErrorToast(error.message);
    } else {
      showSuccessToast('Deposit successful');
      onSuccess?.();
    }
  };

  return (
    <Formik
      validationSchema={depositFormValidationSchema}
      initialValues={{
        amount: '',
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className='flex flex-col gap-4 w-full'>
        <div className='grid grid-cols-1 gap-4'>
          <FormikInput
            autoFocus
            name='amount'
            label='Amount *'
            type='number'
            min={0}
            placeholder='0'
          />
        </div>

        <div className='mt-10 w-full flex gap-6'>
          <Button
            type='reset'
            className='flex-grow'
            variant='outline'
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='flex-grow'
            variant='secondary'
          >
            Deposit
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
