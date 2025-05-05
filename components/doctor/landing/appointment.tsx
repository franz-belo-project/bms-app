import RNDateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { CircleHelp } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { noDataFound } from '~/assets';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useGetAppointment } from '~/context/api/appointment/get-appointment';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { toHourTime, toParamsDate } from '~/lib/utils/format-date';

export function AppointmentContent() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [appointmentDate, setAppointmentDate] = useState(toParamsDate(date));
  const { selectedBranch } = useBranchPort();

  const { data, refetch } = useGetAppointment(selectedBranch, appointmentDate);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    void refetch();
  }, [date, refetch]);

  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-col gap-2">
        <Text className="text-primary">Appointment</Text>
        <Alert
          className="bg-transparent"
          icon={CircleHelp}
          iconClassName="text-primary"
        >
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            Select date to view appointment details.
          </AlertDescription>
        </Alert>
      </View>
      {/* {showPicker ? ( */}
      <TouchableOpacity onPress={toggleDatePicker}>
        <Input
          className="bg-transparent rounded-3xl"
          editable={false}
          placeholder="Select Date"
          value={appointmentDate}
          onChangeText={setAppointmentDate}
          onPressIn={toggleDatePicker}
        />
      </TouchableOpacity>
      {/* ) : null} */}

      {showPicker && Platform.OS === 'android' ? (
        <RNDateTimePicker
          display="calendar"
          mode="date"
          value={date}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            if (event.type === 'set' && selectedDate) {
              setDate(selectedDate);
              toggleDatePicker();
              void refetch();

              setAppointmentDate(toParamsDate(selectedDate));
            } else {
              toggleDatePicker();
            }
          }}
        />
      ) : null}
      {Platform.OS === 'ios' && showPicker ? (
        <RNDateTimePicker
          className="h-20 -mb-2"
          display="spinner"
          mode="date"
          style={{ backgroundColor: '#fff', borderRadius: 50 }}
          textColor="black"
          value={date}
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            if (event.type === 'set' && selectedDate) {
              setDate(selectedDate);
              setAppointmentDate(toParamsDate(selectedDate));
            }
          }}
        />
      ) : null}

      {showPicker && Platform.OS === 'ios' ? (
        <View className="flex flex-row justify-around">
          <Button
            className="rounded-3xl"
            variant="secondary"
            onPress={toggleDatePicker}
          >
            <Text>Cancel</Text>
          </Button>
          <Button className="rounded-3xl" onPress={toggleDatePicker}>
            <Text>Confirm</Text>
          </Button>
        </View>
      ) : null}

      {/* {isFetching ? <ActivityIndicator /> : null} */}

      {data?.data.length === 0 ? (
        <View className="flex items-center justify-center p-10 border-0 bg-primary-foreground">
          <Image
            className="w-20 h-20"
            source={noDataFound as ImageSourcePropType}
          />
          <Text className=" text-muted-foreground">
            No appointment details to shown.
          </Text>
        </View>
      ) : (
        <Accordion className="w-full max-w-sm native:max-w-md" type="single">
          {data?.data.map((dta) => (
            <AccordionItem key={dta.id} value={dta.id}>
              <AccordionTrigger>
                <View>
                  <Text>{dta.procedure.name}</Text>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                <View>
                  <Text className="text-muted-foreground/80">
                    Patient: {dta.patient.first_name} {dta.patient.middle_name}{' '}
                    {dta.patient.last_name}
                  </Text>
                  <Text className="text-muted-foreground/80">
                    Contact: {dta.patient.contact_number}
                  </Text>
                  <Text className="text-muted-foreground/80">
                    Machine: {dta.machine.name}
                  </Text>
                  <Text className="text-muted-foreground/80">
                    Room: {dta.room.number}
                  </Text>
                  <Text className="text-muted-foreground/80">
                    Aesthetician: {dta.aesthetician.name}
                  </Text>
                  <Text className="text-muted-foreground/80">
                    Start: {toHourTime(dta.start_at)}
                  </Text>
                  <Text className="text-muted-foreground/80">
                    End: {toHourTime(dta.end_at)}
                  </Text>
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
                </View>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </View>
  );
}
