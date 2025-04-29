import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useGetUpcomingAppointment } from '~/context/api/appointment/get-upcoming-appointment';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { ScrollViewContentHorizontal } from './scrollview-horizontal';

export function AppointmentContent() {
  const { selectedBranch } = useBranchPort();
  const { data: upcomingAppointment } =
    useGetUpcomingAppointment(selectedBranch);

  return (
    <View className="flex flex-col gap-4 ">
      <View className="flex flex-row justify-between ">
        <Text className="text-primary">Today&apos;s Appointment</Text>
      </View>
      <View>
        <ScrollViewContentHorizontal data={upcomingAppointment} />
      </View>
    </View>
  );
}
