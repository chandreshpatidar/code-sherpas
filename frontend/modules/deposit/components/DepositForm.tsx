'use client';
import React from 'react';
import { Form, Formik } from 'formik';
import FormikInput from '@/components/formik/FormikInput';
import { Button } from '@/components/ui/button';
import { depositFormValidationSchema } from '../validations/depositFormValidationSchema';

interface DepositFormProps {
  onCancel: () => void;
}

export const DepositForm: React.FC<DepositFormProps> = ({ onCancel }) => {
  return (
    <Formik
      validationSchema={depositFormValidationSchema}
      initialValues={{
        amount: 0,
        message: '',
      }}
      onSubmit={(values) => console.log(values)}
    >
      <Form className='flex flex-col gap-4 w-full'>
        <div className='grid grid-cols-1 gap-4'>
          <FormikInput
            name='amount'
            label='Amount *'
          />
        </div>

        <FormikInput
          name='message'
          label='Message'
        />

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
