import { useQuery } from '@tanstack/react-query';
import { handleErrors } from '~/lib/utils/error-handlers';
import { useSession } from '~/context/ctx';
import { toParamsDate } from '~/lib/utils/format-date';
import { fetchApiPrivate } from '../instance';
import { type Token } from '../auth';
import { appointmentSchema } from './schema';

type UpcomingAppointmentParams = {
  date: string;
};

export async function getUpcomingAppointment(
  { token, port }: Token,
  params: UpcomingAppointmentParams,
  // port: string,
) {
  try {
    const response = await fetchApiPrivate(port, token).get(
      '/api/upcoming-appointments',
      { params },
    );

    return appointmentSchema.parse(response.data);
  } catch (err) {
    throw handleErrors(err);
  }
}

export function useGetUpcomingAppointment(port: string) {
  const { session } = useSession();

  return useQuery({
    queryKey: ['upcoming-appointment', session],
    enabled: Boolean(session),
    queryFn: () => {
      if (session) {
        return getUpcomingAppointment(
          { token: session, port },
          { date: toParamsDate(new Date()) },
        );
      }
    },
  });
}
