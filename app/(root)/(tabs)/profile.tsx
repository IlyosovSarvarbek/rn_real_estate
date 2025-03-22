import {  Alert, ImageSourcePropType, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'
import appConfig from "@/app.json"

interface SettingsItemsProps {
  image: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string,
  showArrow?: boolean;
}

const SettingsItem = ({ image, title, onPress, textStyle, showArrow = true }: SettingsItemsProps) => (
  <View className="rounded-md overflow-hidden border-black-300 border-[1px]">
    <Pressable
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: false }}
      onPress={onPress}
      className="flex-row items-center justify-between p-4"
      style={{ borderRadius: 12 }}
    >
      <View className="flex-row items-center gap-3">
        <Image source={image} className="size-6" />
        <Text className={`text-lg font-rubik-medium ${textStyle}`}>{title}</Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className="size-5 opacity-60" />}
    </Pressable>
  </View>
);


const Profile = () => {

  const {user, refetch} = useGlobalContext()

  const handleLogout = async () => {
    const result = await logout()

    if(result){
      Alert.alert("Success", "You have been logged out successfully")
      refetch();
    } else {
      Alert.alert("Error", "An error occured while logging out")
    }
  }

  return (
    <ScrollView 
     showsVerticalScrollIndicator={false}
     contentContainerClassName='pb-32 px-7 bg-white min-h-full'
     >
      
      <View className='flex flex-row mt-5 justify-center'>
          <View className='flex flex-col items-center relative mt-5'>
              <Image source={{uri: user?.avatar || icons.person}} className='size-44 relative rounded-full'/>

                <TouchableOpacity className='absolute bottom-11 right-2'>
                  <Image source={icons.edit} className='size-9'/>
                </TouchableOpacity>
                <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
          </View>
      </View>

      <View className='flex flex-col mt-10 gap-5'>
            <SettingsItem image={icons.calendar} title='My Bookings'/>
            <SettingsItem image={icons.wallet} title='Payments'/>
      </View>

      <View className='flex flex-col mt-5 border-t gap-5 pt-5 border-primary-200'>
        {
          settings.slice(2).map((item, index)=>(
            <SettingsItem key={index} title={item.title} image={item.icon}/>
          ))
        }
      </View>

      <View className='flex flex-col mt-5 border-t gap-5 pt-5 border-primary-200'>
        <SettingsItem image={icons.logout} title='Log Out' showArrow={false} textStyle='text-danger' onPress={handleLogout}/>
      </View>

      <View className='flex flex-1 mt-10 h-[50px] items-center justify-center'>
        <Text className='text-center font-rubik text-primary-300'>App Version: {appConfig.expo.version}</Text>
      </View>
    </ScrollView>
  )
}

export default Profile