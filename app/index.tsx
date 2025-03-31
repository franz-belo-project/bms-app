
import { useRouter } from "expo-router";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { SignIn } from "~/components/featured/form/sign-in";
import { Button } from "~/components/ui/button";

export default function Screen() {
  const router=useRouter()

  const navigateToOtherPage = () => {
    router.push("/admin"); // Navigate to another page in the admin section
  };

  return (  
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="h-full gap-5 p-6 bg-secondary/30">
          <Image source={require('../assets/images/belo_logo_white.png')} className="self-center w-full h-full max-w-xs max-h-44" />
        <SignIn onSubmit={() => undefined} />
        <Button onPress={navigateToOtherPage} >
          <Text>Navigate to another page</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
