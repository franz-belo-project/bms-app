import { z } from 'zod';
import axios from 'axios';
import { handleErrors } from '~/lib/utils/error-handlers';
import { AUTH_LOGIN } from '../endpoint';

export const authTokenSchema = z.object({
  token: z.string(),
});

export type AuthToken = z.infer<typeof authTokenSchema>;

type AuthPayload = {
  branch: string;
  username: string;
  password: string;
};

export async function signIn(payload: AuthPayload) {
  try {
    const response = await axios.post(AUTH_LOGIN, payload);

    return authTokenSchema.parse(response.data);
  } catch (err) {
    // console.log(err.response.data.errors.password[0]);
    // console.log(err.response.data);

    // throw new Error(err.response.data.message);
    throw handleErrors(err);
  }
}
