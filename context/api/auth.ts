import { z } from 'zod';
import { handleErrors } from '~/lib/utils/error-handlers';
import { fetchApi, fetchApiPrivate } from './instance';

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
  port: string;
};

export async function signIn(port: string, payload: AuthPayload) {
  try {
    const response = await fetchApi(port).post('/api/auth/login', payload);

    return authTokenSchema.parse(response.data);
  } catch (err) {
    throw handleErrors(err);
  }
}

type SessionPayload = {
  setSession: () => void;
};

export async function signOut({
  port,
  token,
  setSession,
}: Token & SessionPayload) {
  try {
    const response = await fetchApiPrivate(port, token).get('/api/auth/logout');

    setSession();
    return z.object({}).parse(response.data);
  } catch (error) {
    throw handleErrors(error);
  }
}
