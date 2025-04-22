import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { ScrollViewContentHorizontal } from './scrollview-horizontal';

const data = [
  { id: 1, name: 'Matt Hadj', procedure: 'Cardiology', time: '8:45 AM' },
  { id: 2, name: 'Jaunn Jain', procedure: 'Cardiology', time: '12:00 PM' },
  { id: 3, name: 'Pedro Hernandez', procedure: 'Cardiology', time: '8:30 AM' },
  { id: 4, name: 'MArcus McKinney', procedure: 'Cardiology', time: '9:00 AM' },
  { id: 5, name: 'Samuel Smith', procedure: 'Cardiology', time: '11:30 AM' },
];

export function AppointmentContent() {
  return (
    <View className="flex flex-col gap-4 ">
      <View className="flex flex-row justify-between ">
        <Text className="text-primary">Today&apos;s Appointment</Text>
      </View>
      <View>
        <ScrollViewContentHorizontal data={data} />
      </View>
    </View>
  );
}
