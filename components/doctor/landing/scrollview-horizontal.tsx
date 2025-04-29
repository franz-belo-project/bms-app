import { Clock4 } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { type AppointmentType } from '~/context/api/appointment/schema';
import { toHourTime } from '~/lib/utils/format-date';

type ScrollViewContentProps = {
  data?: AppointmentType;
};

// const convertTo24Hour = (time: string) => {
//   const [hourMinute, period] = time.split(' ');

//   const [hour, minute] = hourMinute.split(':').map(Number);

//   let adjustedHour = hour;

//   if (period === 'AM' && adjustedHour === 12) {
//     adjustedHour = 0;
//   } else if (period === 'PM' && adjustedHour !== 12) {
//     adjustedHour += 12;
//   }

//   return `${adjustedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
// };

export function ScrollViewContentHorizontal({ data }: ScrollViewContentProps) {
  // const sortedData = [...data].sort((a, b) => {
  //   const timeA = convertTo24Hour(a.time);
  //   const timeB = convertTo24Hour(b.time);
  //   return timeA.localeCompare(timeB);
  // });

  return (
    <View className="mh">
      <ScrollView
        className="flex gap-2"
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginBottom: 10,
        }}
        horizontal
      >
        {data?.data.map((dta) => (
          <Card
            className="flex flex-col justify-between w-60 h-60 bg-primary-foreground"
            key={dta.id}
          >
            <View className="flex flex-col gap-2 p-4">
              <Text>
                {dta.patient.last_name}, {dta.patient.first_name}
              </Text>
              <Text>{dta.procedure.name}</Text>
            </View>
            <View className="flex flex-row items-center justify-center gap-2 p-2 text-center rounded-b-md bg-primary/90">
              <Clock4 color="#fff" height={20} width={20} />
              <Text className="text-primary-foreground">
                {toHourTime(dta.start_at)}
              </Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
