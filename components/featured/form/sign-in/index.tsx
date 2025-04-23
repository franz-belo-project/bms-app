import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, View } from 'react-native';
import { Link } from 'expo-router';
import { AlertTriangle } from 'lucide-react-native';
import { Text } from '~/components/ui/text';
// import { useSession } from '~/context/ctx';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { type SignInProps, signInSchema, type SignInType } from './helper';

export function SignIn({ onSubmit, isLoading, errorMessage }: SignInProps) {
  // const { isLoading } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      // branch: '04',
      username: '',
      password: '',
    },
  });

  return (
    <View className="w-full p-8">
      <View className="flex flex-col gap-8">
        <View className="flex flex-col gap-3">
          {errorMessage ? (
            <Alert
              className="w-full bg-transparent "
              icon={AlertTriangle}
              variant="destructive"
            >
              <AlertTitle className="text-destructive">
                {errorMessage}
              </AlertTitle>
              <AlertDescription>
                Possibly username and password didn&apos;t match.
              </AlertDescription>
            </Alert>
          ) : null}
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Input
                  className="bg-transparent rounded-3xl"
                  style={{ height: 50 }}
                  {...field}
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.username ? (
                  <Text className="text-destructive">
                    {errors.username.message}
                  </Text>
                ) : null}
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Input
                  {...field}
                  className="bg-transparent rounded-3xl"
                  placeholder="Enter your password"
                  secureTextEntry
                  style={{ height: 50 }}
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.password ? (
                  <Text className="text-destructive">
                    {errors.password.message}
                  </Text>
                ) : null}
              </View>
            )}
          />
          <Link asChild className="flex self-end" href="/forgot-password">
            <Text>Forgot password?</Text>
          </Link>
        </View>
        <View>
          <Button
            className="rounded-3xl"
            disabled={isLoading}
            onPress={async (e) => {
              await handleSubmit((values) => {
                onSubmit(values, e);
              })(e);
            }}
          >
            {isLoading ? (
              <View className="flex flex-row gap-2">
                <Text>Signing in...</Text>
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <Text>Sign in</Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
