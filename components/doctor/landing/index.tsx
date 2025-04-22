import { SafeAreaView, Text, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { H3, H4 } from '~/components/ui/typography';
import { LandingCard } from './landing-card';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export function LandingPage() {
  return (
    <SafeAreaView>
      <View>
        <View className="container">
          <View className="flex justify-start p-4">
            <View className="flex flex-row items-center gap-4">
              <Avatar alt="Zach Nugent's Avatar" className="w-24 h-24">
                <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                <AvatarFallback>
                  <Text>ZN</Text>
                </AvatarFallback>
              </Avatar>
              <View>
                <H3>Hello</H3>
                <H4>Doc. Franz</H4>
              </View>
            </View>
          </View>
        </View>
        <LandingCard />
      </View>
    </SafeAreaView>
  );
}
