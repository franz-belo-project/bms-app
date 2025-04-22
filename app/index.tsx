import { Redirect } from 'expo-router';
import {
  Image,
  Platform,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ImageBackground,
  type ImageSourcePropType,
  ActivityIndicator,
} from 'react-native';
import { type SubmitHandler } from 'react-hook-form';
import { beloLogo, bmsBg } from '~/assets';
import { SignIn } from '~/components/featured/form/sign-in';
import { Text } from '~/components/ui/text';
import { type SignInType } from '~/components/featured/form/sign-in/helper';
import { useSession } from '~/context/ctx';

export default function Screen() {
  const { session, signIn, isLoading } = useSession();

  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLoginPress: SubmitHandler<SignInType> = async (values, e) => {
    e?.preventDefault();

    await signIn(values.branch, values.username, values.password);
  };

  if (session) {
    return <Redirect href="/doctor" />;
  }

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="h-full">
          <ImageBackground
            className="justify-center flex-1 bg-center bg-no-repeat bg-cover"
            source={bmsBg as ImageSourcePropType}
          >
            <View className="flex flex-col items-center h-full p-2 justify-evenly ">
              <Image
                className="self-center h-36 w-72 "
                source={beloLogo as ImageSourcePropType}
              />
              <Text className="flex text-4xl font-bold text-center ">
                The No. 1 Aesthetic Clinic in the Philippines
              </Text>
              <SignIn onSubmit={onLoginPress} />
              <Text className="flex text-2xl font-medium text-center text-muted-foreground ">
                © {new Date().getFullYear()} Belo Medical Group BMS. All Rights
                Reserved. Powered by ICT.
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
