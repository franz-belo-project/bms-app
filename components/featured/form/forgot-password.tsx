import { zodResolver } from "@hookform/resolvers/zod";
import { type BaseSyntheticEvent } from "react";
import { Controller, type ControllerRenderProps, useForm } from "react-hook-form";
import {  KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

type ForgotPasswordProps = {
  onSubmit: (value: ForgotPasswordType, e?: BaseSyntheticEvent) => void;
}

export function ForgotPasswordContent({ onSubmit }: ForgotPasswordProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleBlur = (field: ControllerRenderProps<{
    email: string;
}, "email">) => {
    void trigger(field.name); // Trigger validation when the field loses focus
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="items-center flex-1 "
    >
      <Card >
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Input
                  {...field}
                  placeholder="Enter your email"
                  value={field.value}
                  onBlur={() => handleBlur(field)}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.email ? <Text className="text-destructive">{errors.email.message}</Text> : null}
              </View>
            )}
          />
          <View>
            <Button
              className="self-end"
              disabled={!isValid}
              onPress={async (e) => {
                await handleSubmit((values) => {
                  onSubmit(values, e);
                })(e);
              }}
            >
              <Text>Send</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </KeyboardAvoidingView>
  );
}
