import { Text, View } from "react-native";

export function ReceptionCard() {

  return (
    <View className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-xl">
      <View className="flex flex-col items-center justify-center w-full gap-2">
        {/* <div className="w-full h-12 rounded-full bg-primary" />
        <div className="w-full h-2 rounded-full bg-primary" />
        <div className="w-full h-2 rounded-full bg-primary" /> */}
        <Text className="text-sm font-bold text-center text-primary">
          Reception
        </Text>
      </View>
    </View>
  );
}