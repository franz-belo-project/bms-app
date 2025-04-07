// import { useRouter } from "expo-router";
import { Link } from 'expo-router';
import { Image, Platform, View , Keyboard , TouchableWithoutFeedback , KeyboardAvoidingView, Text, ImageBackground, SafeAreaView } from 'react-native';
import { SignIn } from '~/components/featured/form/sign-in';
import { Button } from '~/components/ui/button';
// import { Button } from "~/components/ui/button";
 
export default function Screen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="h-full gap-5 p-6 bg-secondary/30">
          <Image
            className="self-center w-full h-full max-w-xs max-h-44"
            source={require('../assets/images/belo_logo_white.png')}
          />
          <SignIn onSubmit={() => undefined} />
          <Link asChild href="./doctor">
            <Button size="sm">
              <Text>Doctor</Text>
            </Button>
          </Link>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
