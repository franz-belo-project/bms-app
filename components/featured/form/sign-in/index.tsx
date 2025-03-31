import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {  View } from "react-native";
import { Link } from "expo-router";
import {
  Card,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Input } from "../../../ui/input";
import { H4 } from "../../../ui/typography";
import { Button } from "../../../ui/button";
import { type SignInProps, signInSchema, type SignInType } from "./helper";


export function SignIn({ onSubmit }: SignInProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card className="w-full p-8">
      <View className="flex flex-col gap-3">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <View className="flex flex-col gap-3">
              <H4>Username: </H4>
              <Input
                {...field}
                placeholder="Enter your username"
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
              />
              {errors.username ? <Text className="text-destructive">
                  {errors.username.message}
                </Text> : null}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <View className="flex flex-col gap-3">
              <H4>Password: </H4>
              <Input
                {...field}
                placeholder="Enter your password"
                secureTextEntry
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
              />
              {errors.password ? <Text className="text-destructive">
                  {errors.password.message}
                </Text> : null}
            </View>
          )}
        />
        <Link asChild className="flex self-end" href="/forgot-password">
          <Text>Forgot password?</Text>
        </Link>
        <Button
          onPress={async(e) => {
            await handleSubmit((values) => {
              onSubmit(values, e);
            })(e);
          }}
        >
          <Text>Sign in</Text>
        </Button>
      </View>
    </Card>
  );
}
