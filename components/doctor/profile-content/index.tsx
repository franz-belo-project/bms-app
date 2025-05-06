import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { Alert, type ImageURISource, View } from 'react-native';
import { ChangePasswordDialog } from '~/components/featured/dialog/change-password/change-password-dialog';
import { type ChangePasswordType } from '~/components/featured/dialog/change-password/helper';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H3, P } from '~/components/ui/typography';
import { putUpdatePassword } from '~/context/api/change-password/update-password';
import { type User } from '~/context/api/user/get-auth-user';
import { useSession } from '~/context/ctx';
import { useBranchPort } from '~/lib/hooks/use-branch-port';
import { AppError } from '~/lib/utils/error-handlers';

type ProfileData = {
  data?: User['data'];
};

export function ProfileContent({ data }: ProfileData) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { session } = useSession();
  const { selectedBranch } = useBranchPort();
  const { mutate: updatePassword } = useMutation({
    mutationFn: putUpdatePassword,
  });

  const onSavePassword = useCallback<SubmitHandler<ChangePasswordType>>(
    (values, e) => {
      e?.preventDefault();

      if (session) {
        updatePassword(
          {
            token: session,
            port: selectedBranch,
            old_password: values.currentPassword,
            password: values.newPassword,
            password_confirmation: values.confirmPassword,
          },
          {
            onSuccess: () => {
              Alert.alert('Successfully!', 'Password has been changed.', [
                { text: 'OK' },
              ]);
              setIsOpen(false);
            },
            onError: (error: unknown) => {
              if (error instanceof AppError) {
                setErrorMessage(error.message);
                setIsOpen(true);
              }
            },
          },
        );
      }
    },
    [session, selectedBranch, updatePassword],
  );

  const nameFallback = `${data?.firstname} ${data?.lastname}}`;

  const initials = nameFallback
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word, index) => (index === 0 ? word[0].toUpperCase() : '')) // Only take the first letter of the first name
    .join('');

  return (
    <View className="flex flex-col gap-5">
      <View className="flex flex-col gap-1">
        <View>
          <Avatar alt="Avatar" className="w-32 h-32">
            <AvatarImage
              source={
                data?.avatar ? (data.avatar as ImageURISource) : undefined
              }
            />
            <AvatarFallback>
              <Text>{initials}</Text>
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
        // onPress={() => router.push('/doctor/profile/profile-update')}
        onPress={() => {
          Alert.alert(
            'Profile update!',
            'Sorry this feature is not ready yet.',
            [{ text: 'OK' }],
          );
        }}
      >
        <Text>Update Profile</Text>
      </Button>

      <ChangePasswordDialog
        errorMessage={errorMessage}
        open={isOpen}
        setOpen={() => setIsOpen(!isOpen)}
        onSubmit={onSavePassword}
      />
    </View>
  );
}
