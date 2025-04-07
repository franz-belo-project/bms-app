
import {   View } from "react-native";
import { ProfileContent } from "~/components/doctor/profile-content";
// import { ChangePasswordDialog } from "~/components/featured/dialog/change-password/change-password-dialog";
import { H2 } from "~/components/ui/typography";

export default function ProfileScreen() {
  return (
    <View className="justify-start flex-1 bg-secondary/30">
      <View className="flex flex-col gap-2 p-4 ">
        <View className="p-4">
          <H2 className="text-foreground dark:text-white">Account Profile</H2>
        </View>
        <ProfileContent
          birthDate="12/12/2000"
          email="zach.nugent@gmail.com"
          firstName="Zach"
          lastName="Nugent"
          middleName="Michael"
          phone={1234567890}
          position="Software Engineer"
          userName="Fbernardino"
        />
      </View>
    </View>
  );
}