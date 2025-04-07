import { View } from "react-native";
import { Text } from "~/components/ui/text";

export function AddPatient() {
  return (
    <View className="flex flex-row justify-start gap-2">
      <Text className="self-start text-lg">Patient Registration</Text>
    </View>
  );
}