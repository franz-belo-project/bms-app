import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Text } from '~/components/ui/text';
import { items } from '../landing/explore';

export function AppointmentScheduleContent() {
  const renderEmptyData = () => {
    return (
      <View className="items-center justify-center flex-1">
        <Text>No events for this day</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <Agenda
        items={items}
        renderEmptyData={renderEmptyData}
        renderItem={(item: { name: string; time: string }) => (
          <View
            style={{
              marginVertical: 10,
              marginTop: 30,
              backgroundColor: 'white',
              marginHorizontal: 10,
              padding: 10,
            }}
          >
            <Text className="font-bold">{item.name}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
        showOnlySelectedDayItems
      />
    </View>
  );
}
