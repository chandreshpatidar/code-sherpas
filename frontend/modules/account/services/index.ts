import axiosInstance from '@/lib/api/axiosConfig';
import {
  DepositApiError,
  DepositMoneyInput,
  TransferApiError,
  TransferMoneyInput,
  WithdrawApiError,
  WithdrawMoneyInput,
} from '../types';
import handleApiError from '@/lib/api/handleApiError';

export const fetchAccounts = async () => {
  try {
    const res = await axiosInstance.get('/accounts');

    return { data: res.data, error: undefined };
  } catch (error) {
    return { data: [], error: handleApiError(error) };
  }
};

export const fetchTransactions = async (accountId: string, limit: number, cursor?: string) => {
  try {
    const path = `/accounts/${accountId}/history?limit=${limit}`;
    const res = await axiosInstance.get(cursor ? `${path}&cursor=${cursor}` : path);

    return { data: res.data, error: undefined };
  } catch (error) {
    return { data: [], error: handleApiError(error) };
  }
};

export const depositMoney = async (accountId: string, body: DepositMoneyInput) => {
  try {
    const res = await axiosInstance.post(`/accounts/${accountId}/deposit`, body);

    return { data: res.data, error: undefined };
  } catch (error) {
    return { data: null, error: handleApiError<DepositApiError>(error) };
  }
};

export const withdrawMoney = async (accountId: string, body: WithdrawMoneyInput) => {
  try {
    const res = await axiosInstance.post(`/accounts/${accountId}/withdraw`, body);

    return { data: res.data, error: undefined };
  } catch (error) {
    return { data: null, error: handleApiError<WithdrawApiError>(error) };
  }
};

export const transferMoney = async (accountId: string, body: TransferMoneyInput) => {
  try {
    const res = await axiosInstance.post(`/accounts/${accountId}/transfer`, body);

    return { data: res.data, error: undefined };
  } catch (error) {
    return { data: null, error: handleApiError<TransferApiError>(error) };
  }
};
