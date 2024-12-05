'use client';
import React, { useMemo } from 'react';
import { Form, Formik, FormikValues } from 'formik';
import FormikInput from '@/components/formik/FormikInput';
import FormikSelect from '@/components/formik/FormikSelect';
import { Button } from '@/components/ui/button';
import { transferFormValidationSchema } from '../validations/transferFormValidationSchema';
import { useAccountStore } from '@/modules/account/store/accountStore';
import { useToast } from '@/hooks/use-toast';
import { TransferMoneyInput } from '@/modules/account/types';

interface TransferFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ onCancel, onSuccess }) => {
  const { transfer, accounts, activeAccount } = useAccountStore();
  const { showSuccessToast, showErrorToast } = useToast();

  const recipients = useMemo(
    () =>
      accounts.reduce((acc, account) => {
        if (account.id !== activeAccount?.id) {
          acc.push({ label: account.id, value: account.id });
        }
        return acc;
      }, [] as { label: string; value: string }[]),
    [accounts, activeAccount]
  );

  const onSubmit = async (values: FormikValues) => {
    const error = await transfer({
      amount: Number(values.amount),
      toAccountId: values.recipient,
    } as TransferMoneyInput);

    if (error?.message) {
      showErrorToast(error.message);
    } else {
      showSuccessToast('Money transfer successful');
      onSuccess?.();
    }
  };

  return (
    <Formik
      validationSchema={transferFormValidationSchema}
      initialValues={{
        amount: '',
        recipient: '',
        message: '',
      }}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form className='flex flex-col gap-4 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormikSelect
            name='recipient'
            options={recipients}
            label='Select Recipient Account*'
          />

          <FormikInput
            name='amount'
            label='Amount *'
            type='number'
            min={0}
            placeholder='0'
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
