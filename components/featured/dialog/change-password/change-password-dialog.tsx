import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import {
  type ChangePasswordProps,
  changePasswordSchema,
  type ChangePasswordType,
} from './helper';

export function ChangePasswordDialog({
  onSubmit,
  error,
  errorMessage,
  open,
  setOpen,
}: ChangePasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogTrigger asChild>
          <Button className="w-full rounded-3xl" variant="outline">
            <Text>Change Password</Text>
          </Button>
        </DialogTrigger>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <DialogContent className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Make changes to your password here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <View className="flex flex-col gap-3">
              {error ? (
                <Alert
                  className="max-w-xl"
                  icon={AlertTriangle}
                  variant="destructive"
                >
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              ) : null}
              <Controller
                control={control}
                name="currentPassword"
                render={({ field }) => (
                  <View className="flex flex-col gap-3">
                    <Text>Current Password: </Text>
                    <Input
                      {...field}
                      placeholder="Enter your current password"
                      secureTextEntry={!showPassword}
                      value={field.value}
                      onChangeText={(value) => field.onChange(value)}
                    />
                    {errors.currentPassword ? (
                      <Text className="text-destructive">
                        {errors.currentPassword.message}
                      </Text>
                    ) : null}
                    {errorMessage ? (
                      <Text className="text-destructive">{errorMessage}</Text>
                    ) : null}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <View className="flex flex-col gap-3">
                    <Text>New Password: </Text>
                    <Input
                      {...field}
                      placeholder="Enter your new password"
                      secureTextEntry={!showPassword}
                      value={field.value}
                      onChangeText={(value) => field.onChange(value)}
                    />
                    {errors.newPassword ? (
                      <Text className="text-destructive">
                        {errors.newPassword.message}
                      </Text>
                    ) : null}
                  </View>
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <View className="flex flex-col gap-3">
                    <Text>Current Password: </Text>
                    <Input
                      {...field}
                      placeholder="Enter your confirm password"
                      secureTextEntry={!showPassword}
                      value={field.value}
                      onChangeText={(value) => field.onChange(value)}
                    />
                    {errors.confirmPassword ? (
                      <Text className="text-destructive">
                        {errors.confirmPassword.message}
                      </Text>
                    ) : null}
                  </View>
                )}
              />
              <View className="flex flex-row gap-2">
                <Checkbox
                  checked={showPassword}
                  id="password"
                  onCheckedChange={onShowPassword}
                />
                <Label nativeID="password">Show password</Label>
              </View>
            </View>
            <Button
              onPress={async (e) => {
                await handleSubmit((values) => {
                  onSubmit(values, e);
                })(e);
              }}
            >
              <Text>Save</Text>
            </Button>
          </DialogContent>
        </TouchableWithoutFeedback>
      </Dialog>
    </KeyboardAvoidingView>
  );
}
