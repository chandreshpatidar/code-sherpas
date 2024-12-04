'use client';
import React from 'react';
import { Form, Formik } from 'formik';
import FormikInput from '@/components/formik/FormikInput';
import FormikSelect from '@/components/formik/FormikSelect';
import { Button } from '@/components/ui/button';
import { transferFormValidationSchema } from '../validations/transferFormValidationSchema';

interface TransferFormProps {
  onCancel: () => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ onCancel }) => {
  return (
    <Formik
      validationSchema={transferFormValidationSchema}
      initialValues={{
        amount: 0,
        recipient: '',
        message: '',
      }}
      onSubmit={(values) => console.log(values)}
    >
      <Form className='flex flex-col gap-4 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormikSelect
            name='recipient'
            options={[
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
            ]}
            label='Select Recipient Account*'
          />

          <FormikInput
            name='amount'
            label='Amount *'
            type='number'
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
            Send Money
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
