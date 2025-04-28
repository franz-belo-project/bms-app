import { z } from 'zod';
import { handleErrors } from '~/lib/utils/error-handlers';
import { fetchApi, fetchPrivateApi } from './instance';

export const authTokenSchema = z.object({
  token: z.string(),
});

export type AuthToken = z.infer<typeof authTokenSchema>;

type AuthPayload = {
  branch: string;
  username: string;
  password: string;
};

export type Token = {
  token: string;
};

export async function signIn(port: string, payload: AuthPayload) {
  try {
    const response = await fetchApi(port).post('/api/auth/login', payload);

    return authTokenSchema.parse(response.data);
  } catch (err) {
    throw handleErrors(err);
  }
}

export async function signOut({ token }: Token) {
  const response = await fetchPrivateApi('10704', token).get(
    '/api/auth/logout',
  );

  return z.object({}).parse(response.data);
}
