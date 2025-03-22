import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {GestureHandlerRootView} from "react-native-gesture-handler"

import "./globals.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { GlobalProvider } from "@/lib/global-provider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <GestureHandlerRootView className="h-full">
          <SafeAreaView style={{flex:1}}>
            <StatusBar hidden={true}/>
              <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
          </GestureHandlerRootView>
    </GlobalProvider>
  );
}