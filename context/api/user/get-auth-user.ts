import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { handleErrors } from '~/lib/utils/error-handlers';
import { useSession } from '~/context/ctx';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { type Token } from '../auth';
import { fetchApiPrivate } from '../instance';

export const userSchema = z.object({
  data: z.object({
    id: z.number(),
    display_name: z.string().nullable(),
    firstname: z.string().nullable(),
    lastname: z.string().nullable(),
    username: z.string().nullable(),
    user_theme: z.string().nullable(),
    has_touchmd: z.boolean().nullable(),
    avatar: z.string().nullable(),
    created_at: z.coerce.date().nullable(),
    position: z.string().nullable(),
    user_access_group: z.string().nullable(),
    doctor: z.object({
      id: z.number(),
      code: z.string().nullable(),
      name: z.string().nullable(),
    }),
  }),
});

export type User = z.infer<typeof userSchema>;

export async function getAuthUser({ port, token }: Token) {
  try {
    const response = await fetchApiPrivate(port, token).get('/api/profile');

    return userSchema.parse(response.data);
  } catch (error) {
    throw handleErrors(error);
  }
}

export function useGetAuthUser() {
  const { session } = useSession();
  const { selectedBranch } = useBranchPort();

  return useQuery({
    queryKey: ['profile', session],
    enabled: Boolean(session),
    queryFn: () => {
      if (session) {
        return getAuthUser({ token: session, port: selectedBranch });
      }
    },
  });
}
