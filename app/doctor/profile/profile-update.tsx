import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import {
  // ImageBackground,
  // type ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
// import { bmsBg } from '~/assets';
import { ProfileUpdateContent } from '~/components/doctor/profile-content/profile-update-content';
import { Text } from '~/components/ui/text';
import { H2 } from '~/components/ui/typography';

export default function ProfileUpdateScreen() {
  return (
    // <ImageBackground
    //   className="justify-center flex-1 bg-center bg-no-repeat bg-cover"
    //   source={bmsBg as ImageSourcePropType}
    // >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView className="flex-1 bg-transparent">
        <View className="flex flex-col justify-start gap-8 p-4">
          <View className="flex flex-row items-center gap-2">
            <ChevronLeft color="#000" />
            <Link href="/doctor">
              <Text>Home</Text>
            </Link>
            <ChevronLeft color="#000" />
            <Link href="/doctor/profile">
              <Text>Profile</Text>
            </Link>
            <ChevronLeft color="#000" />
            <Text className="text-secondary">Profile - update</Text>
          </View>
          <View className="flex flex-col gap-2 p-4 ">
            <View className="p-4">
              <H2 className="mb-2 text-foreground">Profile Update</H2>
              <Text className="text-lg">
                You can update your account details below. Click
                &apos;Save&apos; when you&apos;re finished.
              </Text>
            </View>
            <ProfileUpdateContent onSubmit={() => undefined} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    // </ImageBackground>
  );
}
