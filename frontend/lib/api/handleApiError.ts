import { AxiosError } from 'axios';

function handleApiError<T>(error: unknown): T | string | unknown {
  if (error instanceof AxiosError) {
    return error.response?.data || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return error;
  }
}

export default handleApiError;
