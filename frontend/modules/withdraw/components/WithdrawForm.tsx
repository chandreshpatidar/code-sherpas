'use client';
import React from 'react';
import { Form, Formik, FormikValues } from 'formik';
import FormikInput from '@/components/formik/FormikInput';
import { Button } from '@/components/ui/button';
import { withdrawFormValidationSchema } from '../validations/withdrawFormValidationSchema';
import { useAccountStore } from '@/modules/account/store/accountStore';
import { useToast } from '@/hooks/use-toast';

interface WithdrawFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({ onCancel, onSuccess }) => {
  const { withdraw } = useAccountStore();
  const { showSuccessToast, showErrorToast } = useToast();

  const onSubmit = async (values: FormikValues) => {
    const body = { amount: Number(values.amount) };
    const error = await withdraw(body);

    if (error?.message) {
      showErrorToast(error.message);
    } else {
      showSuccessToast('Withdrawal successful');
      onSuccess?.();
    }
  };

  return (
    <Formik
      validationSchema={withdrawFormValidationSchema}
      initialValues={{
        amount: '',
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className='flex flex-col gap-4 w-full'>
        <div className='grid grid-cols-1 gap-4'>
          <FormikInput
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
            Withdraw Money
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
