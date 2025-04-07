import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { z } from "zod";
// import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'This field is required'),
    newPassword: z
      .string()
      .min(12, 'The password must be at least 12 characters long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[\w\W]{12,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      ),
    confirmPassword: z.string().min(1, 'This field is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords did not match',
    path: ['confirmPassword'],
  });

type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type ChangePasswordProps = {
  onSubmit: (value: ChangePasswordType, e?: BaseSyntheticEvent) => void;
}

export function ChangePasswordDialog({onSubmit}:ChangePasswordProps) {
   const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<ChangePasswordType>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
      },
    });

  return (
     <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Text>Change Password</Text>
        </Button>
      </DialogTrigger>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <View className="flex flex-col gap-3">
          <Controller
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Text>Current Password: </Text>
                <Input
                  {...field}
                  placeholder="Enter your current password"
                  secureTextEntry
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.currentPassword ? <Text className="text-destructive">
                    {errors.currentPassword.message}
                  </Text> : null}
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
                  secureTextEntry
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.newPassword ? <Text className="text-destructive">
                    {errors.newPassword.message}
                  </Text> : null}
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
                  secureTextEntry
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.confirmPassword ? <Text className="text-destructive">
                    {errors.confirmPassword.message}
                  </Text> : null}
              </View>
            )}
          />
        </View>
        <Button
           onPress={async(e) => {
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
  )
} 