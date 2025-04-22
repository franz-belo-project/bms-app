import { EllipsisVertical } from 'lucide-react-native';
import { Link } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSession } from '~/context/ctx';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Text } from '../ui/text';

export function MenuBar() {
  const { signOut } = useSession();

  return (
    <DropdownMenu className="z-10">
      <DropdownMenuTrigger asChild>
        <Button className="w-10 h-10" variant="ghost">
          <EllipsisVertical className="text-white " color="white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href="/doctor/profile">
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
                  <Link
                    className="w-full"
                    href="/doctor/profile/profile-update"
                  >
                    <Text>Update Profile</Text>
                  </Link>
                </DropdownMenuItem>
              </Animated.View>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onPress={() => signOut()}>
          <Text>Log out</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
