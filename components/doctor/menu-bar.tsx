import { CircleEllipsis, CircleUser, LogOut } from 'lucide-react-native';
import { Link } from 'expo-router';
// import Animated, { FadeIn } from 'react-native-reanimated';
import { View } from 'react-native';
import { useSession } from '~/context/ctx';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuSub,
  // DropdownMenuSubContent,
  // DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Text } from '../ui/text';

export function MenuBar() {
  const { signOut } = useSession();

  return (
    <DropdownMenu className="z-10">
      <DropdownMenuTrigger asChild>
        <Button className="w-10 h-10" variant="ghost">
          <CircleEllipsis className="text-white " color="white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72">
        <DropdownMenuLabel>
          <Text>My Account</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full " href="/doctor/profile">
              <View className="flex flex-row items-center justify-start w-full gap-2">
                <CircleUser color="#000" size={20} />
                <Text className="text-muted-foreground">Profile</Text>
              </View>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Text className="text-foreground">Settings</Text>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Animated.View entering={FadeIn.duration(200)}>
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href="/doctor/profile/profile-update"
                  >
                    <Text>Update Profile</Text>
                  </Link>
                </DropdownMenuItem>
              </Animated.View>
            </DropdownMenuSubContent>
          </DropdownMenuSub> */}
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onPress={() => signOut()}>
          <View className="flex flex-row items-center justify-start w-full gap-2">
            <LogOut color="#000" size={20} />
            <Text className="text-muted-foreground">Log out</Text>
          </View>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
