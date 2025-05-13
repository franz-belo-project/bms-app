import { Redirect } from 'expo-router';
import {
  Image,
  Platform,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  type ImageSourcePropType,
  ScrollView,
} from 'react-native';
import { type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { beloLogo } from '~/assets';
import { SignIn } from '~/components/featured/form/sign-in';
import { Text } from '~/components/ui/text';
import { type SignInType } from '~/components/featured/form/sign-in/helper';
import { useSession } from '~/context/ctx';
import { AppError } from '~/lib/utils/error-handlers';

export default function Screen() {
  const { session, signIn, isLoading } = useSession();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onLoginPress: SubmitHandler<SignInType> = async (values, e) => {
    e?.preventDefault();

    try {
      await signIn(values.branch, values.username, values.password);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  if (session) {
    return <Redirect href="/doctor" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="h-full">
          <ScrollView className="bg-primary-foreground">
            <View className="flex flex-col items-center h-full gap-2 p-2 justify-evenly ">
              <Image
                className="self-center w-64 h-32 "
                source={beloLogo as ImageSourcePropType}
              />
              <Text className="flex text-4xl font-bold text-center ">
                The No. 1 Aesthetic Clinic in the Philippines
              </Text>
              <SignIn
                errorMessage={errorMessage}
                isLoading={isLoading}
                onSubmit={onLoginPress}
              />
              <Text
                className="flex text-2xl font-medium text-center text-muted-foreground "
                style={{ fontFamily: 'Poppins-Regular' }}
              >
                © {new Date().getFullYear()} Belo Medical Group BMS. All Rights
                Reserved. Powered by ICT.
              </Text>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
