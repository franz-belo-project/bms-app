import { ScrollView } from 'react-native';
import { LandingPage } from '~/components/doctor/landing';

export default function DoctorScreen() {
  return (
    <ScrollView className="flex-1 bg-primary-foreground">
      <LandingPage />
    </ScrollView>
  );
}
