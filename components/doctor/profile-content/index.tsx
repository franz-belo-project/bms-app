import { Text, View } from "react-native";
import { ChangePasswordDialog } from "~/components/featured/dialog/change-password/change-password-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
// import { Button } from "~/components/ui/button";
import { H3, H4, P } from "~/components/ui/typography";

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';


type ProfileScreenProps = {
  userName:string
  firstName:string
  lastName:string
  position:string
  middleName?:string
  email:string
  phone:number
  birthDate:string    
}

export function ProfileContent({userName,email,phone,position,firstName,lastName,middleName, birthDate}:ProfileScreenProps) {
  return (
    <View className="flex flex-col gap-5">
    <View className="flex flex-col gap-1">
    <Avatar alt="Zach Nugent's Avatar"  className="w-40 h-40">
      <AvatarImage className="w-50 h-50" source={{ uri: GITHUB_AVATAR_URI }}/>
      <AvatarFallback>
        <Text>ZN</Text>
      </AvatarFallback>
    </Avatar>
    <View className="flex flex-col space-y-5">
      <H3 className="text-foreground dark:text-white">Username: {userName}</H3>
      <H4 className="text-foreground dark:text-white">{lastName} , {firstName}  {middleName}.</H4>
      <P className="text-secondary-foreground dark:text-secondary">{position}</P>
      <P className="text-secondary-foreground dark:text-secondary">{email}</P>
      <P className="text-secondary-foreground dark:text-secondary">Mobile Number: {phone}</P>
      <P className="text-secondary-foreground dark:text-secondary">{birthDate}</P>
    </View>
 
    </View>
    <View className="flex flex-col items-start gap-2">
      {/* <Button className="w-full max-w-[150px]"><Text>Update Profile</Text></Button> */}
      <ChangePasswordDialog onSubmit={()=>undefined}/>
    </View>
  </View>
  )
}