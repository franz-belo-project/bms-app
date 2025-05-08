import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { ProfileContent } from '~/components/doctor/profile-content';
import { Text } from '~/components/ui/text';
import { H2 } from '~/components/ui/typography';
import { useGetAuthUser } from '~/context/api/user/get-auth-user';

export const data = {
  userName: 'Zach Nugent',
  firstName: 'Zach',
  lastName: 'Nugent',
  position: 'Software Engineer',
  middleName: 'Michael',
  email: 'zach.nugent@gmail.com',
  phone: 1234567890,
  birthDate: '12/12/2000',
};

export default function ProfileScreen() {
  const { data: user } = useGetAuthUser();

  const userData = user?.data;

  return (
    <ScrollView className="flex-1 bg-primary-foreground">
      <View className="flex flex-col justify-start gap-8 p-4">
        <View className="flex flex-row items-center gap-2">
          <ChevronLeft color="#000" />
          <Link href="/doctor">
            <Text>Home</Text>
          </Link>
          <ChevronLeft color="#000" />
          <Text className="text-secondary">Profile</Text>
        </View>
        <View className="flex flex-col gap-2 p-4 ">
          <View className="p-4">
            <H2 className="text-foreground">Account Profile</H2>
          </View>
          <ProfileContent data={userData} />
        </View>
      </View>
    </ScrollView>
  );
}
