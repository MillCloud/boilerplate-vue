/* eslint-disable import/prefer-default-export */
import { useLocalStorage } from '@vueuse/core';

export function useToken() {
  const token = useLocalStorage('token', '');
  const setToken = (value: string) => {
    token.value = value;
  };
  return {
    token,
    setToken,
  };
}
