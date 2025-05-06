import {
  // ImageBackground,
  // type ImageSourcePropType,
  ScrollView,
} from 'react-native';
// import { bmsBg } from '~/assets';
import { LandingPage } from '~/components/doctor/landing';

export default function DoctorScreen() {
  return (
    // <ImageBackground
    //   className="justify-center flex-1 bg-center bg-no-repeat bg-cover"
    //   source={bmsBg as ImageSourcePropType}
    // >
    <ScrollView className="flex-1 bg-transparent">
      <LandingPage />
    </ScrollView>
    // </ImageBackground>
  );
}
