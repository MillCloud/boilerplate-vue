/* eslint-disable import/prefer-default-export */
import { useAxios } from '../useAxios';

export function useApiSignIn({
  username,
  password,
  showError = true,
}: { username?: string; password?: string; showError?: boolean } = {}) {
  return useAxios('/api/sign-in', {
    method: 'POST',
    data: { username, password },
    showError,
  });
}
