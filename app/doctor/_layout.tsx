import "~/global.css";

import { DarkTheme, DefaultTheme, type Theme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { MenuBar } from "~/components/doctor/menu-bar";
import { DoctorHeader } from "~/components/doctor/header";
import { Text } from "~/components/ui/text";
import { Footer } from "~/components/featured/footer";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function DoctorLayout({children}:ReactNode) {
  const hasMounted = useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);
  
    useIsomorphicLayoutEffect(() => {
      if (hasMounted.current) {
        return;
      }
  
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      void setAndroidNavigationBar(colorScheme);
      setIsColorSchemeLoaded(true);
      hasMounted.current = true;
    }, []);
  
    if (!isColorSchemeLoaded) {
      return null;
    }
  
  return (
    <>
      <DoctorHeader/>
    <Slot/>

    </>
    // <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
    //   <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
    //   <Stack screenOptions={{headerShown:false}}> 
    //     <DoctorHeader/>
    //     <Stack.Screen name="index" options={{headerShown:false}}/>
    //     <Stack.Screen name="add-patient" options={{headerShown:true}}/>
    //   </Stack>
    // </ThemeProvider>

  );
}


const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? useEffect
    : useLayoutEffect;