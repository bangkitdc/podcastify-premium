import { AxiosError } from 'axios'
import { IApiBaseResponseError } from '@/types/http'
import { useRef } from 'react';

const useError = <TError = unknown>() => {
  const errorsRef = useRef<TError | undefined>(undefined);
  const messageRef = useRef<string | undefined>(undefined);

  const getErrors = (key?: keyof TError) => {
    const errors = errorsRef.current;
    if (errors instanceof Array && !key) {
      return errors;
    }
    if (errors && key && errors[key] instanceof Array) {
      return errors[key];
    }
  }

  const getMessage = () => {
    const message = messageRef.current;

    return message;
  }

  const set = (error: unknown) => {
    const err = error as AxiosError<IApiBaseResponseError<TError>>

    // setErrors(err.response?.data.errors);
    errorsRef.current = err.response?.data.errors;
    // setMessage(err.response?.data.message || '');
    messageRef.current = err.response?.data.message;
  }

  const clear = () => {
    // setErrors(undefined);
    errorsRef.current = undefined;
    // setMessage('');
    messageRef.current = undefined;
  }

  return { set, getErrors, getMessage, clear }
}

export default useError;