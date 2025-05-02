import { useQuery } from '@tanstack/react-query';
import { handleErrors } from '~/lib/utils/error-handlers';
import { useSession } from '~/context/ctx';
import { type Token } from '../auth';
import { fetchApiPrivate } from '../instance';
import { appointmentSchema } from './schema';

type AppointmentParams = {
  date: string;
  query: string;
};

export async function getAppointment(
  { port, token }: Token,
  params: AppointmentParams,
) {
  try {
    const response = await fetchApiPrivate(port, token).get(
      'api/appointments',
      { params },
    );

    return appointmentSchema.parse(response.data);
  } catch (err) {
    throw handleErrors(err);
  }
}

export function useGetAppointment(port: string, date: string) {
  const { session } = useSession();

  return useQuery({
    queryKey: ['appointment', session],
    enabled: Boolean(session),
    queryFn: () => {
      if (session) {
        return getAppointment({ token: session, port }, { date, query: '' });
      }
    },
  });
}
