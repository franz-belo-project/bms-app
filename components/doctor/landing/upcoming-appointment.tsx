import { Image, type ImageSourcePropType, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useGetUpcomingAppointment } from '~/context/api/appointment/get-upcoming-appointment';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { noDataFound } from '~/assets';
import { ScrollViewContentHorizontal } from './scrollview-horizontal';

export function UpcomingAppointmentContent() {
  const { selectedBranch } = useBranchPort();
  const { data: upcomingAppointment } =
    useGetUpcomingAppointment(selectedBranch);

  return (
    <View className="flex flex-col gap-4 ">
      <View className="flex flex-row justify-between ">
        <Text className="text-primary">Upcoming Appointment</Text>
      </View>
      <View>
        {upcomingAppointment?.data.length === 0 ? (
          <View className="flex items-center justify-center p-4 border-0 bg-primary-foreground">
            <Image
              className="w-20 h-20"
              source={noDataFound as ImageSourcePropType}
            />
            <Text className=" text-muted-foreground">
              No upcoming appointment
            </Text>
          </View>
        ) : (
          <ScrollViewContentHorizontal data={upcomingAppointment} />
        )}
      </View>
    </View>
  );
}
