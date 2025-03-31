import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { ForgotPasswordContent } from "~/components/featured/form/forgot-password";


export default function ForgotPassword() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="items-center justify-center flex-1 h-full gap-5 p-6 bg-secondary/30">
        <ForgotPasswordContent onSubmit={() => undefined} />
      </View>
    </TouchableWithoutFeedback>
  );
} 
