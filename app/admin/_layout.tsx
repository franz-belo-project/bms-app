import { View, Text,  } from "react-native";
import { useRouter } from "expo-router";

// This is the layout file for the /admin routes.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();

  return (
    <View >
      <Text >Admin Panel</Text>
      <View >{children}</View>
    </View>
  );
}