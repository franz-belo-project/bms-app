import { View } from 'react-native';
import { Text } from '../ui/text';

export function Footer() {
  return (
    <View className="flex items-center w-full py-4 bg-white dark:bg-secondary/30 dark: ">
      <View className="flex flex-col items-center justify-center gap-2 ">
        <Text className="">
          {new Date().getFullYear()} Belo Medical Group. All rights reserved.
        </Text>
        <Text>Powered by ICT.</Text>
      </View>
    </View>
  );
}
