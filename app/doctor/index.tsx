
import { useRouter } from "expo-router";
import { CalendarCheck, CreditCard, Plus, Search } from "lucide-react-native";
import {  Text, View  } from "react-native";
import { Button } from "~/components/ui/button";
import { H2 } from "~/components/ui/typography";
 
export default function DoctorScreen() {
    const router=useRouter()
  
    const navigateToOtherPage = () => {
      router.push("/doctor/add-patient"); // Navigate to another page in the admin section
    };

  return (
    <View className="justify-start flex-1 bg-secondary/30">
      <View className="flex flex-col gap-2 p-4 ">
        <View className="p-4">
          <H2 className="text-foreground dark:text-white">Reception</H2>
        </View>
        <Button className="flex flex-row justify-start gap-2" onPress={navigateToOtherPage}>
          <Plus />
          <Text className="self-start text-lg">
            Add Patient
          </Text>
        </Button>
        <Button className="flex flex-row justify-start gap-2">
          <Search/>
          <Text>Search Patient</Text>
        </Button>
        <Button className="flex flex-row justify-start gap-2">
          <CalendarCheck />
          <Text>Appointment</Text>
        </Button>
        <Button className="flex flex-row justify-start gap-2">
          <CreditCard />
          <Text>Card Inquiry</Text>
        </Button>
      </View>
    </View>
  );
}