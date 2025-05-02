import { Redirect, Stack } from 'expo-router';
import { DoctorHeader } from '~/components/doctor/header';
import { useSession } from '~/context/ctx';
import { Text } from '~/components/ui/text';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function DoctorLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, header: Header }}
      />
      <Stack.Screen
        name="profile/index"
        options={{ headerShown: true, header: Header }}
      />
      <Stack.Screen
        name="profile/profile-update"
        options={{ headerShown: true, header: Header }}
      />
      <Stack.Screen
        name="appointment/[date]"
        options={{ headerShown: true, header: Header }}
      />
    </Stack>
  );
}

function Header() {
  return <DoctorHeader />;
}
