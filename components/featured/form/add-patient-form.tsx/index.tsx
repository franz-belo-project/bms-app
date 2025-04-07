import { View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { H4 } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { addPatientSchema, type AddPatientType } from "./helper";

export function AddPatientForm() {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<AddPatientType>({
      resolver: zodResolver(addPatientSchema),
      defaultValues: {
        lastName: "",
        firstName: "",
        middleName: "",
        employmentSector: "",
        natureOfBusiness: "",
        positionLevel: "",
        gender: "",
        religion: "",
        birthDate: new Date(),
        age: 0,
        maritalStatus: "",
        citizenship: "",
        country: "",
        province: "",
        cityOrTown: "",
        brgyOrSub: "",
        street: "",
        houseNumber: "",
        mobileNumberOne: 0,
        mobileNumberTwo: 0,
        mobileNumberThree: 0,
        faxNumber: 0,
        email: "",
        contactPerson: 0,
        patientNotes: "",
        gpEmployeeNumber: "", 
      },
    });

  return (
    <View >
      <View>
        <View>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>Last Name: </H4>
                <Input
                  {...field}
                  placeholder="Enter first name"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.lastName ? <Text className="text-destructive">
                    {errors.lastName.message}
                  </Text> : null}
              </View>
            )}
          />
             <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>First Name: </H4>
                <Input
                  {...field}
                  placeholder="Enter last name"
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
                <H4>Middle Name: </H4>
                <Input
                  {...field}
                  placeholder="Enter your username"
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
            name="employmentSector"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>Employement Sector: </H4>
                <Input
                  {...field}
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.employmentSector ? <Text className="text-destructive">
                    {errors.employmentSector.message}
                  </Text> : null}
              </View>
            )}
          />
                <Controller
            control={control}
            name="natureOfBusiness"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>Nature of Business: </H4>
                <Input
                  {...field}
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.natureOfBusiness ? <Text className="text-destructive">
                    {errors.natureOfBusiness.message}
                  </Text> : null}
              </View>
            )}
          />

            <Controller
            control={control}
            name="positionLevel"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>Position Level: </H4>
                <Input
                  {...field}
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.positionLevel ? <Text className="text-destructive">
                    {errors.positionLevel.message}
                  </Text> : null}
              </View>
            )}
          />

            <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>Gender: </H4>
                <Input
                  {...field}
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.gender ? <Text className="text-destructive">
                    {errors.gender.message}
                  </Text> : null}
              </View>
            )}
          />
            <Controller
            control={control}
            name="religion"
            render={({ field }) => (
              <View className="flex flex-col gap-3">
                <H4>Religion: </H4>
                <Input
                  {...field}
                  placeholder="Enter your username"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
                {errors.religion ? <Text className="text-destructive">
                    {errors.religion.message}
                  </Text> : null}
              </View>
            )}
          />
          
        </View>
      </View>
    </View>
  )
} 