import { Controller, type FieldValues, type Path, type UseFormReturn } from "react-hook-form"
import { Platform, TouchableOpacity, View } from "react-native"
import RNDateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text"
import { dateFormat } from "~/lib/utils/format-date";
import { Button } from "~/components/ui/button";

type FormFieldDatePickerProps <T extends FieldValues> = {
  control :UseFormReturn<T>['control']
  name:Path<T>;
  label?:string;
}

export function FormFieldDatePicker<T extends FieldValues>({
  control,
  name, 
  label,
  }:FormFieldDatePickerProps<T>) {
    const [date,setDate]=useState(new Date())
    const [showPicker,setShowPicker]=useState<boolean>(false)

    const toggleDatePicker=()=>{
      setShowPicker(!showPicker)
    }


    return(
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <View className="flex flex-col gap-3">
            <Text>{label}: </Text>
            <TouchableOpacity activeOpacity={1} onPress={toggleDatePicker}>
              <Input
                className="bg-transparent rounded-3xl" 
                editable={ false }
                // editable={Platform.OS === 'ios'? }
                placeholder="Enter your birthdate"
                // style={{borderWidth:1,borderColor:'black',color:'black'}}
                value={field.value}                  
                onChangeText={(value) => field.onChange(value)}    
                onPressIn={toggleDatePicker}
              />    
            </TouchableOpacity>
         
            {showPicker && Platform.OS === 'android' ? <RNDateTimePicker
              display="calendar"
              mode="date"
              value={date}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                if (event.type === 'set' && selectedDate) {
                  setDate(selectedDate);
                  toggleDatePicker();
                  field.onChange(dateFormat(selectedDate));
                } else {
                  toggleDatePicker();
                }
              }}
            /> : null}

            {Platform.OS === 'ios' && showPicker ?
             <RNDateTimePicker
              className="h-20 -mb-2"
              display="spinner"
              mode="date"
              style={{backgroundColor:'#fff', borderRadius:50}}
              textColor="black"
              value={date}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                if (event.type === 'set' && selectedDate) {
                  setDate(selectedDate);
                  field.onChange(dateFormat(selectedDate));
                }
              }}
            /> : null}

            {showPicker && Platform.OS==='ios' ? <View
                className="flex flex-row justify-around"
              >
                <Button className="rounded-3xl" variant='secondary' onPress={toggleDatePicker}>
                  <Text>Cancel</Text>
                </Button>
                <Button className="rounded-3xl" onPress={toggleDatePicker}>
                  <Text>Confirm</Text>
                </Button>
              </View> : null}
            {/* {errors.birthDate ? <Text className="text-destructive">
                {errors.birthDate.message}
              </Text> : null} */}
          </View>
        )}
      />
    )
  }