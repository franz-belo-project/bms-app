import { Controller, useForm } from "react-hook-form";
import {  View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { data } from "~/app/doctor/profile";
import { type ProfileProps, profileSchema, type ProfileType } from "./helper";
import { FormFieldDatePicker } from "./fragments/formfield-datepicker";

export function ProfileUpdateContent({onSubmit}:ProfileProps) {
  const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<ProfileType>({
      resolver: zodResolver(profileSchema),
      defaultValues: {
       firstName:data.firstName,
       lastName:data.lastName,
       middleName:data.middleName,
       position:data.position,
       email:data.email,
       phoneNumber:data.phone,
       birthDate:data.birthDate,  
      },
    });

  return (
    <View className="pb-10">
      <View className="container">
        <View className="flex flex-col gap-3">
         <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Text>First name: </Text>
                <Input
                className="bg-transparent rounded-3xl" 
                  {...field}
                  placeholder="Enter your first name"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.firstName ? <Text className="text-destructive">
                    {errors.firstName.message}
                  </Text> : null}
              </View>
            )}
          />
          <Controller
            control={control}
            name="middleName"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Text>Middle name: </Text>
                <Input
                className="bg-transparent rounded-3xl" 
                  {...field}
                  placeholder="Enter your middle name"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.middleName ? <Text className="text-destructive">
                    {errors.middleName.message}
                  </Text> : null}
              </View>
            )}
          />
           <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Text>Last name: </Text>
                <Input
                className="bg-transparent rounded-3xl" 
                  {...field}
                  placeholder="Enter your last name"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.lastName ? <Text className="text-destructive">
                    {errors.lastName.message}
                  </Text> : null}
              </View>
            )}
          />
          <View className="flex flex-row w-full gap-3">
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <View className="flex flex-col w-1/2 gap-3">
                  <Text>Position: </Text>
                  <Input
                  className="bg-transparent rounded-3xl" 
                    {...field}
                    placeholder="Enter your position"
                    value={field.value}
                    onChangeText={(value) => field.onChange(value)}
                  />
                  {errors.position ? <Text className="text-destructive">
                      {errors.position.message}
                    </Text> : null}
                </View>
              )}
            />
            <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <View className="flex flex-col w-1/2 gap-3">
                <Text>Phone number: </Text>
                <Input
                className="bg-transparent rounded-3xl" 
                  {...field}
                  keyboardType="number-pad"
                  placeholder="Enter your phone number"
                  value={field.value.toString() || ''}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.phoneNumber ? <Text className="text-destructive">
                    {errors.phoneNumber.message}
                  </Text> : null}
              </View>
            )}
          />
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <Text>Email: </Text>
                <Input
                className="bg-transparent rounded-3xl" 
                  {...field}
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.email ? <Text className="text-destructive">
                    {errors.email.message}
                  </Text> : null}
              </View>
            )}
          />
          <View>

          <FormFieldDatePicker control={control} label="Birthdate" name="birthDate"/>
          </View>
       
           <Button
           className="mt-10 rounded-3xl"
              onPress={async(e) => {
              await handleSubmit((values) => {
                onSubmit(values, e);
              })(e);
            }}
            >
              <Text>Save</Text>
            </Button>
        </View>
      </View>
    </View>
  )
}