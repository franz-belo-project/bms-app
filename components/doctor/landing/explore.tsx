import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';

export const items = {
  '2025-04-14': [{ name: 'Meeting with client', time: '10:00 AM' }],
  '2025-04-16': [
    { name: 'Team brainstorming session', time: '9:00 AM' },
    { name: 'Project presentation', time: '9:15 PM' },
    { name: 'Project presentation', time: '10:00 PM' },
    { name: 'Project presentation', time: '11:00 PM' },
    { name: 'Project presentation', time: '11:30 PM' },
    { name: 'Project presentation', time: '2:00 PM' },
  ],
  '2025-04-17': [
    { name: 'Team brainstorming session', time: '9:00 AM' },
    { name: 'Project presentation', time: '2:00 PM' },
  ],
  '2025-04-25': [
    { name: 'Team brainstorming session', time: '9:00 AM' },
    { name: 'Project presentation', time: '2:00 PM' },
  ],
};

export function ExploreContent() {
  const router = useRouter();

  const onDayPress = (day: { dateString: string }) => {
    const date = day.dateString;

    if (date) {
      router.push(`/doctor/appointment/${date}`);
    }
  };

  return (
    <View className="flex flex-col gap-4 ">
      <View className="flex flex-row items-center justify-center gap-4">
        {/* <CalendarCheck color='color-primary' height={35} width={35} /> */}
        <Text className="text-2xl">Appointment</Text>
      </View>
      <View className="flex flex-col gap-4">
        <Calendar onDayPress={onDayPress} />
      </View>
    </View>
  );
}
