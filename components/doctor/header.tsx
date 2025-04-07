import { Image, SafeAreaView, View } from "react-native";
import { Link } from "expo-router";
import { MenuBar } from "./menu-bar";

export function DoctorHeader() {


  return ( 
    <SafeAreaView className="flex">  
      <View className="flex justify-start bg-secondary/30">
        <View className="flex flex-row items-center justify-between w-full h-20 p-4 bg-primary-foreground">
        <Link className="w-full h-full max-w-[80px] max-h-20" href='/doctor'>
          <Image className="w-full h-full max-w-[80px] max-h-20" source={require('../../assets/images/belo_logo_white.png')} />
        </Link>
          <View className="flex self-start ">
            <MenuBar/>    
          </View>
        </View>
      </View>
    </SafeAreaView> 
  );
}  