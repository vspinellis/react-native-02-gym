import { Input as NativeBaseInput, IInputProps } from 'native-base';
import { border } from 'native-base/lib/typescript/theme/styled-system';

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      bg='gray.700'
      h={14}
      px={4}
      borderWidth={0}
      fontSize='md'
      color='white'
      fontFamily='heading'
      mb={4}
      placeholderTextColor='gray.300'
      {...rest}
    />
  );
}