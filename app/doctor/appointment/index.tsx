import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import {  ImageBackground, type ImageSourcePropType, View } from "react-native";
import { bmsBg } from "~/assets";
import { AppointmentScheduleContent } from "~/components/doctor/appointment";
import { Text } from "~/components/ui/text";

export default function AppointmentScreen() {
  return (
     <ImageBackground
      className='justify-center flex-1 bg-center bg-no-repeat bg-cover'
      source={bmsBg as ImageSourcePropType}
    >
      {/* <ScrollView className="flex-1 bg-transparent"> */}
        <View className="flex flex-col justify-start gap-8 p-4">
          <View className="flex flex-row items-center gap-2">
            <ChevronLeft color="#000"/>
            <Link href='/doctor'>
              <Text >
                Home
              </Text>
            </Link>
            <ChevronLeft color="#000"/>
            <Text className="text-secondary">
              Appointment
            </Text>
          </View>
        </View>
        <AppointmentScheduleContent/>
      {/* </ScrollView> */}
    </ImageBackground>
  );
}