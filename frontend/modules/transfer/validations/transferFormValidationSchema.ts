import * as Yup from 'yup';

export const transferFormValidationSchema = Yup.object({
  amount: Yup.number().required('Amount is required').min(1, 'Amount must be greater than 0'),
  recipient: Yup.string().required('Select recipient account'),
});
