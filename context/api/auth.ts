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

type Token = {
  token: string | null;
};

export async function signIn(payload: AuthPayload) {
  try {
    const response = await fetchApi('19704').post('/api/auth/login', payload);

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

// export const authSampleSchema = z.object({
//   accessToken: z.string(),
//   refreshToken: z.string(),
//   id: z.number(),
//   username: z.string(),
//   email: z.string(),
//   firstName: z.string(),
//   lastName: z.string(),
//   gender: z.string(),
//   image: z.string(),
// });

// type AuthDumpPayload = {
//   username: string;
//   password: string;
// };

// export async function signInAuthDump(payload: AuthDumpPayload) {
//   try {
//     const response = await axios.post(
//       'https://dummyjson.com/auth/login',
//       payload,
//     );

//     return authSampleSchema.parse(response.data);
//   } catch (error) {
//     throw handleErrors(error);
//   }
// }
