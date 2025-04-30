import { z } from 'zod';
import { handleErrors } from '~/lib/utils/error-handlers';
import { fetchApiPrivate } from '../instance';
import { type Token } from '../auth';

export function updateAuthUser({ port, token }: Token) {
  try {
    const response = await fetchApiPrivate(port, token).post('/api/profile');

    return z.object({}).parse(response.data);
  } catch (error) {
    throw handleErrors(error);
  }
}
