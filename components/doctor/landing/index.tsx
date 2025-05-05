import { SafeAreaView, Text, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { H3, H4 } from '~/components/ui/typography';
import { useGetAuthUser } from '~/context/api/user/get-auth-user';
import { LandingCard } from './landing-card';

export function LandingPage() {
  const { data: user } = useGetAuthUser();

  const nameFallback = `${user?.data.firstname} ${user?.data.lastname}`;

  const initials = nameFallback
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word, index) => (index === 0 ? word[0].toUpperCase() : '')) // Only take the first letter of the first name
    .join('');

  return (
    <SafeAreaView>
      <View>
        <View className="container">
          <View className="flex justify-start p-4">
            <View className="flex flex-row items-center gap-4">
              <Avatar alt="Zach Nugent's Avatar" className="w-24 h-24">
                <AvatarImage source={undefined} />
                <AvatarFallback>
                  <Text>{initials}</Text>
                </AvatarFallback>
              </Avatar>
              <View>
                <H3>Hello</H3>
                <H4>{user?.data.doctor.name}</H4>
              </View>
            </View>
          </View>
        </View>
        <LandingCard />
      </View>
    </SafeAreaView>
  );
}
