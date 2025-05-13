import { type ImageURISource, SafeAreaView, Text, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { H3, H4 } from '~/components/ui/typography';
import { useGetAuthUser } from '~/context/api/user/get-auth-user';
import { avatarIcon } from '~/assets';
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
              <Avatar alt="Avatar" className="w-24 h-24">
                <AvatarImage
                  source={
                    user?.data.avatar
                      ? (user.data.avatar as ImageURISource)
                      : (avatarIcon as ImageURISource)
                  }
                />
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
