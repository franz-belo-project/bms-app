import { RefreshControl, ScrollView } from 'react-native';
import { LandingPage } from '~/components/doctor/landing';
import { useGetUpcomingAppointment } from '~/context/api/appointment/get-upcoming-appointment';
import { useBranchPort } from '~/lib/hooks/use-branch-port';

export default function DoctorScreen() {
  const { selectedBranch } = useBranchPort();
  const { refetch, isLoading } = useGetUpcomingAppointment(selectedBranch);
  return (
    <ScrollView
      className="flex-1 bg-primary-foreground"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <LandingPage />
    </ScrollView>
  );
}
