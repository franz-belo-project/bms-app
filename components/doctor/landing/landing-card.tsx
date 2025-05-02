import { View } from 'react-native';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { H4 } from '~/components/ui/typography';
import { dateFormat } from '~/lib/utils/format-date';
import { UpcomingAppointmentContent } from './upcoming-appointment';
import { AppointmentContent } from './appointment';

const patient = [
  { label: '1', value: 'John Doe' },
  { label: '2', value: 'Jane Doe' },
  { label: '3', value: 'Bob Smith' },
  { label: '4', value: 'Alice Brown' },
  { label: '5', value: 'John Smith' },
];

export function LandingCard() {
  const [selected, setSelected] = useState('');

  return (
    <Card className="h-full rounded-[28px] border-primary/30 bg-transparent ">
      <CardHeader>
        <SelectList
          boxStyles={{
            borderRadius: 50,
            borderColor: '#000',
            borderWidth: 1,
            backgroundColor: '#fff',
          }}
          data={patient}
          dropdownShown={false}
          setSelected={setSelected}
          onSelect={() => selected}
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <H4>{dateFormat(new Date())}</H4>
        <View className="flex flex-col gap-4">
          <UpcomingAppointmentContent />
          <AppointmentContent />
          {/* <ExploreContent /> */}
        </View>
      </CardContent>
    </Card>
  );
}
