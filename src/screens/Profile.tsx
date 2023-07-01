import { VStack, Text, ScrollView, Center, Skeleton, Heading } from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import { UserPhoto } from '../components/UserPhoto';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  return (
    <VStack>
      <ScreenHeader title='Perfil' />
      <ScrollView contentContainerStyle={{ paddingBottom: 56 }}>
        <Center mt={6} px={10}>
          <Skeleton
            w={PHOTO_SIZE}
            h={PHOTO_SIZE}
            rounded='full'
            startColor='gray.500'
            endColor='gray.400'
            isLoaded={!photoIsLoading}
          >
            <UserPhoto
              source={{ uri: 'https://github.com/vspinellis.png' }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          </Skeleton>
          <TouchableOpacity>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar Foto
            </Text>
          </TouchableOpacity>
          <Input bg='gray.600' placeholder='Nome' value='Vinicius Spinellis' />
          <Input
            bg='gray.600'
            isDisabled
            value='vspinellis@hotmail.com'
            placeholder='E-mail'
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color='gray.200' fontSize='md' mb={2} mt={12}>
            Alterar senha
          </Heading>
          <Input bg='gray.600' placeholder='Senha antiga' secureTextEntry />
          <Input bg='gray.600' placeholder='Nova senha' secureTextEntry />
          <Input bg='gray.600' placeholder='Confirme a nova senha' secureTextEntry />

          <Button title='Atualizar' mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
