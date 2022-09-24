import React from 'react';
import {View} from 'react-native';

import {Checkbox, Date, Input, Radio} from '../../../components/custom';

export const InputPreview = ({placeholder}: {placeholder: string}) => (
  <NullPointer>
    <Input width="100%" order={3} placeholder={placeholder} value={''} />
  </NullPointer>
);
export const CheckboxPreview = ({data, title}: {data: any; title: string}) => (
  <NullPointer>
    <Checkbox data={data} title={title} value={[]} />
  </NullPointer>
);
export const RadioPreview = ({data, title}: {data: any; title: string}) => (
  <NullPointer>
    <Radio data={data} title={title} onSelect={() => {}} />
  </NullPointer>
);
export const DropDownPreview = ({
  data,
  placeholder,
}: {
  data: any;
  placeholder: string;
}) => (
  <NullPointer>
    <Input
      placeholder={placeholder}
      rightIcon="down"
      order={3}
      value={''}
      list={data}
    />
  </NullPointer>
);

export const DatePreview = ({title}: {title: string}) => {
  return (
    <NullPointer>
      <Date
        title={title}
        date={{open: false, date: '25-09-2022'}}
        onPress={() => {}}
        setDate={() => {}}
      />
    </NullPointer>
  );
};

const NullPointer = ({children}: {children: any}) => (
  <View pointerEvents="none">{children}</View>
);
