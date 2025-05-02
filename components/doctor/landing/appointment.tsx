import RNDateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { CircleHelp } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
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
        <View className="flex items-center justify-center w-full h-40">
          <Text>No appointment data</Text>
        </View>
      ) : (
        <Accordion className="w-full max-w-sm native:max-w-md" type="single">
          {data?.data.map((dta) => (
            <AccordionItem key={dta.id} value={dta.id as string}>
              <AccordionTrigger>
                <View>
                  <Text>{dta.procedure.name}</Text>
                </View>
              </AccordionTrigger>
              <AccordionContent>
                <View>
                  <Text>
                    Patient: {dta.patient.first_name} {dta.patient.middle_name}{' '}
                    {dta.patient.last_name}
                  </Text>
                  <Text>Contact: {dta.patient.contact_number}</Text>
                  <Text>Machine: {dta.machine.name}</Text>
                  <Text>Room: {dta.room.number}</Text>
                  <Text>Aesthetician: {dta.aesthetician.name}</Text>
                  <Text>Start: {toHourTime(dta.start_at)}</Text>
                  <Text>End: {toHourTime(dta.end_at)}</Text>
                  <Button
                    className="self-start mt-4 rounded-3xl bg-primary"
                    size="sm"
                  >
                    <Text className="text-accent">View details...</Text>
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
