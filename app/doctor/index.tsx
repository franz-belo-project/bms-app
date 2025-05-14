import { useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { LandingPage } from '~/components/doctor/landing';
import { useGetUpcomingAppointment } from '~/context/api/appointment/get-upcoming-appointment';
import { useSession } from '~/context/ctx';
import { useBranchPort } from '~/lib/hooks/use-branch-port';

export default function DoctorScreen() {
  const { signOut } = useSession();
  const { selectedBranch } = useBranchPort();
  const { refetch, isLoading: isRefresh } =
    useGetUpcomingAppointment(selectedBranch);

  useEffect(() => {
    if (selectedBranch === '') {
      signOut();
    }
  }, [selectedBranch, signOut]);

  return (
    <ScrollView
      className="flex-1 bg-primary-foreground"
      refreshControl={
        <RefreshControl refreshing={isRefresh} onRefresh={refetch} />
      }
    >
      <LandingPage />
    </ScrollView>
  );
}
