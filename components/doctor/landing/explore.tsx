import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useMemo, useState } from 'react';
import { type MarkedDates } from 'react-native-calendars/src/types';
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
  const [selectedDate, setSelectedDate] = useState('');

  const markedDates = useMemo<MarkedDates>(() => {
    return Object.keys(items).reduce<MarkedDates>((acc, date) => {
      acc[date] = {
        marked: true,
        selected: true,
        ...(date === selectedDate && {
          selected: true,
          selectedColor: 'blue',
        }),
      };
      return acc;
    }, {});
  }, [selectedDate]);

  const onDayPress = (day: { dateString: string }) => {
    const date = day.dateString;
    setSelectedDate(date);

    if (date in items) {
      router.push('./doctor/appointment/');
    }
  };

  return (
    <View className="flex flex-col gap-4 ">
      <View className="flex flex-row items-center justify-center gap-4">
        {/* <CalendarCheck color='color-primary' height={35} width={35} /> */}
        <Text className="text-2xl">Monthly Schedule</Text>
      </View>
      <View className="flex flex-col gap-4">
        <Calendar markedDates={markedDates} onDayPress={onDayPress} />
      </View>
    </View>
  );
}
