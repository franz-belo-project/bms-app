import {
  Image,
  type ImageSourcePropType,
  SafeAreaView,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { beloHeaderLogo } from '~/assets';
import { MenuBar } from './menu-bar';

export function DoctorHeader() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ paddingTop: insets.top }}>
      <View className="flex justify-start bg-primary">
        <View className="flex flex-row items-center justify-between w-full h-20 p-4 ">
          <Link className="w-full h-full max-w-[80px] max-h-20" href="/doctor">
            <Image
              className="w-full h-full max-w-[80px] max-h-20"
              source={beloHeaderLogo as ImageSourcePropType}
            />
          </Link>
          <View className="flex self-start ">
            <MenuBar />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
