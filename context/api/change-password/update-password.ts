import { handleErrors } from '~/lib/utils/error-handlers';
import { fetchApiPrivate } from '../instance';
import { type Token } from '../auth';
import { userSchema } from '../user/get-auth-user';

type UpdatePasswordPayload = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

export async function putUpdatePassword({
  port,
  token,
  ...payload
}: Token & UpdatePasswordPayload) {
  try {
    const response = await fetchApiPrivate(port, token).post(
      '/api/profile/change-password',
      payload,
    );

    return userSchema.parse(response.data);
  } catch (error) {
    throw handleErrors(error);
  }
}
