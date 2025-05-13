import { Link, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import {
  type ImageSourcePropType,

  // ImageBackground,
  // type ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { avatarIcon } from '~/assets';
// import { bmsBg } from '~/assets';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Text } from '~/components/ui/text';
import { H2 } from '~/components/ui/typography';
import { useGetAppointment } from '~/context/api/appointment/get-appointment';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { toHourTime } from '~/lib/utils/format-date';

export default function PatientDetailsScreen() {
  const { selectedBranch } = useBranchPort();
  const { id, date } = useLocalSearchParams();
  const normalizedDate = Array.isArray(date) ? date[0] : date;

  const { data } = useGetAppointment(selectedBranch, normalizedDate);

  const patientDate = data?.data.find((patient) => patient.id === id);

  const nameFallback = `${patientDate?.patient.first_name} ${patientDate?.patient.last_name}`;

  const initials = nameFallback
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word, index) => (index === 0 ? word[0].toUpperCase() : '')) // Only take the first letter of the first name
    .join('');

  return (
    // <ImageBackground
    //   className="justify-center flex-1 bg-center bg-no-repeat bg-cover"
    //   source={bmsBg as ImageSourcePropType}
    // >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className="flex-1 bg-primary-foreground">
        <View className="flex flex-col justify-start gap-8 p-4">
          <View className="flex flex-row items-center gap-2">
            <ChevronLeft color="#000" />
            <Link href="/doctor">
              <Text>Home</Text>
            </Link>

            <ChevronLeft color="#000" />
            <Text className="text-secondary">Patient Details</Text>
          </View>
          <View className="flex flex-col gap-2 p-4 ">
            <View>
              <H2 className="mb-2 text-foreground">Patient Details</H2>
              <View className="flex flex-col gap-2 mt-5">
                <Avatar alt="Zach Nugent's Avatar" className="w-14 h-14">
                  <AvatarImage
                    className="w-10 h-10"
                    source={
                      patientDate?.patient.avatar
                        ? { uri: patientDate.patient.avatar }
                        : (avatarIcon as ImageSourcePropType)
                    }
                  />
                  <AvatarFallback>
                    <Text>{initials}</Text>
                  </AvatarFallback>
                </Avatar>
                <View className="flex flex-row gap-2">
                  <Text className="flex-1 text-muted-foreground/70">
                    Patient name:{' '}
                  </Text>
                  <Text className="flex-1">
                    {patientDate?.patient.first_name}{' '}
                    {patientDate?.patient.middle_name}{' '}
                    {patientDate?.patient.last_name}
                  </Text>
                </View>
                <View className="flex flex-row gap-2">
                  <Text className="flex-1 text-muted-foreground/70">
                    Appointment date:{' '}
                  </Text>
                  <Text className="flex-1">
                    {patientDate?.appointment_date}
                  </Text>
                </View>
                <View className="flex flex-row gap-2">
                  <Text className="flex-1 text-muted-foreground/70">
                    Contact number:{' '}
                  </Text>
                  <Text className="flex-1">
                    {patientDate?.patient.contact_number}
                  </Text>
                </View>
              </View>
            </View>
            <View className="mt-5">
              <View className="flex flex-row gap-1">
                <View className="w-1/2">
                  <Text className="text-muted-foreground/70">Procedure: </Text>
                  <Text className="">{patientDate?.procedure.name} </Text>
                </View>
                <View className="w-1/2">
                  <Text className="text-muted-foreground/70">Room: </Text>
                  <Text className="">{patientDate?.room.number} </Text>
                </View>
              </View>
              <View className="flex flex-row gap-1">
                <View className="w-1/2">
                  <Text className="text-muted-foreground/70">Start: </Text>
                  <Text className="">
                    {patientDate?.start_at
                      ? toHourTime(patientDate.start_at)
                      : null}
                  </Text>
                </View>
                <View className="w-1/2">
                  <Text className="text-muted-foreground/70">End: </Text>
                  <Text className="">
                    {patientDate?.end_at
                      ? toHourTime(patientDate.end_at)
                      : null}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-muted-foreground/70">Aesthetician:</Text>
                <Text>{patientDate?.aesthetician.name}</Text>
              </View>
              <View />

              <Text className="text-muted-foreground/70">
                Appointment subject:
              </Text>
              <Text>{patientDate?.appointment_subject}</Text>
            </View>
            <View className="mt-5">
              <View className="flex flex-row gap-1">
                <View className="w-1/2">
                  <Text className="text-muted-foreground/70">
                    Appointment status:{' '}
                  </Text>
                  <Text className="">{patientDate?.appointment_status}</Text>
                </View>
                <View className="w-1/2">
                  <Text className="text-muted-foreground/70">
                    Confirmation status:{' '}
                  </Text>
                  <Text className="">{patientDate?.confirmation_status}</Text>
                </View>
              </View>
              <View>
                <Text className="text-muted-foreground/70">Booked by:</Text>
                <Text>{patientDate?.booked_by}</Text>
              </View>
              <View>
                <Text className="text-muted-foreground/70">Notes:</Text>
                <Text>{patientDate?.appointment_notes}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    // </ImageBackground>
  );
}
