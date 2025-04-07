import { ChevronLeft } from "lucide-react-native";
import { View } from "react-native";
import { AddPatient } from "~/components/doctor/reception/add-patient";
import { Text } from "~/components/ui/text";

export default function AddPatientScreen() {
  return (
    <View className="flex flex-col justify-start gap-8 p-4">
      <View className="flex flex-row items-center gap-2">
        <ChevronLeft/>
        <Text >
          Back
        </Text>
      </View>
      <AddPatient/>
    </View>
  );
}