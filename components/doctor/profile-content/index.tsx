import { useRouter } from 'expo-router';
import { Pen } from 'lucide-react-native';
import { View } from 'react-native';
import { ChangePasswordDialog } from '~/components/featured/dialog/change-password/change-password-dialog';
// import { UpdateInfoDialog } from "~/components/featured/dialog/update/update-info-dialog";
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
// import { Button } from "~/components/ui/button";
import { H3, H4, P } from '~/components/ui/typography';

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

type ProfileScreenProps = {
  userName: string;
  firstName: string;
  lastName: string;
  position: string;
  middleName?: string;
  email: string;
  phone: number;
  birthDate: string;
};

type ProfileData = {
  data: ProfileScreenProps;
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
          <Pen color="#000" />
        </View>
        <View className="flex flex-col gap-2 space-y-5">
          <H3 className="mb-4 text-foreground">Username: {data.userName}</H3>
          <H4 className="text-foreground ">
            {data.lastName} , {data.firstName} {data.middleName}.
          </H4>
          <P className="text-secondary-foreground ">{data.position}</P>
          <P className="text-secondary-foreground ">{data.email}</P>
          <P className="text-secondary-foreground ">
            Mobile Number: {data.phone}
          </P>
          <P className="text-secondary-foreground ">{data.birthDate}</P>
        </View>
      </View>
      {/* <View className="flex flex-col items-center gap-2"> */}
      <Button
        className="w-full rounded-3xl "
        onPress={() => router.push('/doctor/profile/profile-update')}
      >
        <Text>Update Profile</Text>
      </Button>

      {/* <UpdateInfoDialog/> */}
      <ChangePasswordDialog onSubmit={() => undefined} />
      {/* </View> */}
    </View>
  );
}
