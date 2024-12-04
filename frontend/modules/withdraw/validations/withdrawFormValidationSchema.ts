import * as Yup from 'yup';

export const withdrawFormValidationSchema = Yup.object({
  amount: Yup.number().required('Amount is required').min(1, 'Amount must be greater than 0'),
});
