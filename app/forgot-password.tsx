import {
  ImageBackground,
  type ImageSourcePropType,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { bmsBg } from '~/assets';
import { ForgotPasswordContent } from '~/components/featured/form/forgot-password';
import { Text } from '~/components/ui/text';

export default function ForgotPassword() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full">
        <ImageBackground
          className="justify-center flex-1 bg-center bg-no-repeat bg-cover"
          source={bmsBg as ImageSourcePropType}
        >
          <View className="flex flex-col items-center h-full p-2 justify-evenly ">
            <ForgotPasswordContent onSubmit={() => undefined} />
            <Text className="flex text-2xl font-medium text-center text-muted-foreground ">
              © {new Date().getFullYear()} Belo Medical Group BMS. All Rights
              Reserved. Powered by ICT.
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
