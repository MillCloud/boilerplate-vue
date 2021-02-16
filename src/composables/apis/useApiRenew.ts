/* eslint-disable import/prefer-default-export */
import { useAxios } from '../useAxios';

export function useApiRenew({
  showError = true,
}: {
  showError?: boolean;
} = {}) {
  return useAxios('/api/renew', {
    method: 'POST',
    showError,
  });
}
