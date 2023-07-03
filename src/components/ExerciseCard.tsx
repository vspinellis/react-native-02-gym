import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ExerciseDTO } from '../dtos/ExerciseDTO';
import { API } from '../service/api';

type Props = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
        <Image
          alt='Homem em uma academia levantando um peso em um braço só'
          source={{
            uri: `${API.defaults.baseURL}/exercise/thumb/${data.thumb}`
          }}
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode='cover'
        />
        <VStack flex={1}>
          <Heading fontSize='lg' color='white' fontFamily='heading'>
            {data.name}
          </Heading>
          <Text numberOfLines={2} fontSize='sm' color='gray.200' mt={1}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name='chevron-thin-right' color='gray.300' />
      </HStack>
    </TouchableOpacity>
  );
}
