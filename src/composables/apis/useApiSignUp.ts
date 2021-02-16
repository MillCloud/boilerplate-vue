/* eslint-disable import/prefer-default-export */
import { useAxios } from '../useAxios';

export function useApiSignUp({
  email,
  username,
  nickname,
  password,
  showError = true,
}: {
  email?: string;
  username?: string;
  nickname?: string;
  password?: string;
  showError?: boolean;
} = {}) {
  return useAxios('/api/sign-up', {
    method: 'POST',
    data: { email, username, nickname, password },
    showError,
  });
}
