
import { Link } from 'expo-router';
import { Image, Platform, View , Keyboard , TouchableWithoutFeedback , KeyboardAvoidingView, ImageBackground, type ImageSourcePropType,  } from 'react-native';
import { beloLogo, bmsBg } from '~/assets';
import { SignIn } from '~/components/featured/form/sign-in';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
 
export default function Screen() {
  return ( 
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View className='h-full'>
      <ImageBackground
      className='justify-center flex-1 bg-center bg-no-repeat bg-cover'
      source={bmsBg as ImageSourcePropType}
      >
        <View className='flex flex-col items-center h-full p-2 justify-evenly '>
          <Image
          className="self-center h-36 w-72 "
    
          source={beloLogo as ImageSourcePropType}
 
          />
          <Text className='flex text-4xl font-bold text-center '>The No. 1 Aesthetic Clinic in the Philippines</Text>
          <SignIn onSubmit={() => undefined} />
             <Link asChild href="./doctor">
            <Button size="sm">
              <Text>Doctor</Text>
            </Button>
          </Link>
          <Text className='flex text-2xl font-medium text-center text-muted-foreground '>
            © {new Date().getFullYear()} Belo Medical Group BMS. All Rights Reserved. Powered by ICT.
          </Text>
          
        </View>
      </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}
