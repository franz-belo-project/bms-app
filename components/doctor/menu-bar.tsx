
import { CircleEllipsis } from "lucide-react-native";
import { Link } from "expo-router";
import Animated, { FadeIn } from "react-native-reanimated";
import { View } from "react-native";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Text } from "../ui/text";
import { ThemeToggle } from "../ThemeToggle";

export function MenuBar() {
  return(
    <DropdownMenu className="z-10">
    <DropdownMenuTrigger asChild>
      <Button variant='ghost'>
        <CircleEllipsis className="text-white "/>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-64 native:w-72' >
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href='/doctor/profile'>
          <Text>Profile</Text>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Text className="text-foreground">Settings</Text>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <Animated.View entering={FadeIn.duration(200)}>
              <DropdownMenuItem>
                <Text>Change Password</Text>
              </DropdownMenuItem>
                <View className="flex flex-row items-center justify-between p-2">
                <Text>Mode</Text>
                <ThemeToggle/>
                </View>
            </Animated.View>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator /> 
      <DropdownMenuItem>
        <Text>Log out</Text>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}