import { useRouter } from 'expo-router';
import { Clock4 } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { PatientDetailsDialog } from '~/components/featured/dialog/patient-details-dialog/patient-details-dialog';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { type AppointmentType } from '~/context/api/appointment/schema';
import { toHourTime } from '~/lib/utils/format-date';

type ScrollViewContentProps = {
  data?: AppointmentType;
};

export function ScrollViewContentHorizontal({ data }: ScrollViewContentProps) {
  const router = useRouter();

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
            <View>
              <Button
                className="self-start mt-4 rounded-3xl text-primary"
                size="sm"
                variant="link"
                onPress={() =>
                  // router.push(`./doctor/patient-details/${dta.id}`)
                  router.push({
                    pathname: `./doctor/patient-details/${dta.id}`,
                    params: { date: dta.appointment_date },
                  })
                }
              >
                <Text className="text-primary">View details...</Text>
              </Button>
              <PatientDetailsDialog data={data.data} id={dta.id} />
              <View className="flex flex-row items-center justify-center gap-2 p-2 text-center rounded-b-md bg-primary/90">
                <Clock4 color="#fff" height={20} width={20} />
                <Text className="text-primary-foreground">
                  {toHourTime(dta.start_at)}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
