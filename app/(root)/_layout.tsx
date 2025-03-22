import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, router, Stack } from "expo-router";
import { ActivityIndicator, Image, TouchableOpacity, View, Text } from "react-native";

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();

  if (loading)
    return (
      <View className="h-full bg-white flex items-center justify-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </View>
    );

  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#f8f8f8" },
        headerTintColor: "#333",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="properties/[id]"
        options={({ route }) => ({
        headerShown: true,
          header: () => (
            <View className="flex flex-row items-center justify-between px-4 py-2 bg-white shadow-md">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-200 rounded-full size-11 flex items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-lg font-rubik-bold text-black-300">
                Property Details
              </Text>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.heart} className="size-7" tintColor={"#191D31"} />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          ),
        })}
      />
    </Stack>
  );
}