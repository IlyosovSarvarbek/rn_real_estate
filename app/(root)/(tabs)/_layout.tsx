import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Tabs, router } from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 10) return "Good Morning!";
  if (hour >= 10 && hour < 15) return "Good Day!";
  if (hour >= 15 && hour < 19) return "Good Afternoon!";
  if (hour >= 19 && hour < 22) return "Good Evening!";
  return "Good Night!";
};


const HomeHeader = () => {
  const {user} = useGlobalContext()
  return (
    <View className="px-5 bg-white pb-4 shadow-lg">
      <View className="flex flex-row items-center justify-between mt-5">
        <Link href={"/profile"}>
          <View className="flex flex-row items-center">
            <Image source={{uri: user?.avatar}} className="size-12 rounded-full" />
            <View className="flex flex-col items-start justify-center ml-2">
              <Text className="text-xs font-rubik text-black-100">{getGreeting()}</Text>
              <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
            </View>
          </View>
        </Link>
        <Image source={icons.bell} className="size-6" />
      </View>
    </View>
  );
};


const ExploreHeader = () => {
  return (
    <View className="bg-white shadow-lg px-5 py-3 flex flex-row items-center justify-between">
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-primary-200 rounded-full size-12 flex items-center justify-center active:opacity-80"
      >
        <Image source={icons.backArrow} className="size-5" />
      </TouchableOpacity>

      <Text className="text-lg font-rubik-medium text-black-300 flex-1 text-center">
        Search Your Ideal Home
      </Text>

      <TouchableOpacity className="p-2 active:opacity-80">
        <Image source={icons.bell} className="size-7" />
      </TouchableOpacity>
    </View>
  );
};


const ProfileHeader = () => {
  return (
    <View className="w-full h-20 bg-white flex-row items-center justify-between px-6 shadow-lg">
        <Text className='text-xl font-rubik-bold'>Profile</Text>
        <Image className='size-6' source={icons.bell}/>
    </View>
  );
};

const TabBarIcon = ({ icon, title, focused }: { icon: any; title: string; focused: boolean }) => {
  return (
    <View className="flex-1 mt-3 flex flex-col items-center h-full">
      <Image
        source={icon}
        tintColor={focused ? "#0061ff" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={
          (focused ? "text-primary-300 font-rubik-medium " : "text-black-200 font-rubik ") +
          "text-xs w-full text-center mt-1"
        }
      >
        {title}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF",
          borderTopWidth: 1,
          minHeight: 50,
          maxHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          header: () => <HomeHeader />,
          tabBarButton: (props) => <Pressable {...props} className="flex-1 items-center justify-center" android_ripple={{ color: "transparent" }} />,
          tabBarIcon: ({ focused }) => <TabBarIcon icon={icons.home} title="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          header: () => <ExploreHeader />,
          tabBarButton: (props) => <Pressable className="flex-1 items-center justify-center" {...props} android_ripple={{ color: "transparent" }} />,
          tabBarIcon: ({ focused }) => <TabBarIcon icon={icons.search} title="Explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          header: () => <ProfileHeader />,
          tabBarButton: (props) => <Pressable {...props} className="flex-1 items-center justify-center" android_ripple={{ color: "transparent" }} />,
          tabBarIcon: ({ focused }) => <TabBarIcon icon={icons.person} title="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;