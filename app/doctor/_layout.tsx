import "~/global.css";

import { DarkTheme, DefaultTheme, type Theme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { DoctorHeader } from "~/components/doctor/header";


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

export default function DoctorLayout() {
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
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown:false, }}> 
        <Stack.Screen name="index" options={{ headerShown:true , header:Header }}/>
        <Stack.Screen name="profile/index" options={{headerShown:true, header:Header,}}/>
        <Stack.Screen name="profile/profile-update" options={{headerShown:true, header:Header,}}/>
        <Stack.Screen name="appointment/index" options={{headerShown:true, header:Header,}}/>

      </Stack> 
    </ThemeProvider>

  );
}

function Header() {
  return <DoctorHeader />;
}


const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? useEffect
    : useLayoutEffect;