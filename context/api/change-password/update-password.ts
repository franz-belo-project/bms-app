import { handleErrors } from '~/lib/utils/error-handlers';
import { fetchApiPrivate } from '../instance';
import { type Token } from '../auth';

export function updatePassword({ port, token }: Token) {
  try {
    const response = await fetchApiPrivate(port, token).post(
      '/api/profile/password',
      payload,
    );

    return response.data;
  } catch (error) {
    throw handleErrors(error);
  }
}
