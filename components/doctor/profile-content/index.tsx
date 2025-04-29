import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { ChangePasswordDialog } from '~/components/featured/dialog/change-password/change-password-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H3, P } from '~/components/ui/typography';
import { type User } from '~/context/api/user/get-auth-user';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

type ProfileData = {
  data?: User['data'];
};

export function ProfileContent({ data }: ProfileData) {
  const router = useRouter();

  return (
    <View className="flex flex-col gap-5">
      <View className="flex flex-col gap-1">
        <View>
          <Avatar alt="Zach Nugent's Avatar" className="w-40 h-40">
            <AvatarImage
              className="w-50 h-50"
              source={{ uri: GITHUB_AVATAR_URI }}
            />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
        </View>
        <View className="flex flex-col gap-2 space-y-5">
          <View>
            <H3 className="text-foreground">{data?.doctor.name}</H3>
            <P>Code: {data?.doctor.code}</P>
          </View>
          <View>
            <P className="text-secondary-foreground ">
              Name: {data?.firstname} {data?.lastname}
            </P>
            <P className="text-secondary-foreground ">
              Username: {data?.username}
            </P>
            <P className="text-secondary-foreground ">
              Position: {data?.position}
            </P>
          </View>
        </View>
      </View>
      <Button
        className="w-full rounded-3xl "
        onPress={() => router.push('/doctor/profile/profile-update')}
      >
        <Text>Update Profile</Text>
      </Button>

      <ChangePasswordDialog onSubmit={() => undefined} />
    </View>
  );
}
