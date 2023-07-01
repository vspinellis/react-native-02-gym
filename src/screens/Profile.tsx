import { VStack, Text, ScrollView, Center, Skeleton } from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import { UserPhoto } from '../components/UserPhoto';
import { useState } from 'react';

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  return (
    <VStack>
      <ScreenHeader title='Perfil' />
      <ScrollView>
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
        </Center>
      </ScrollView>
    </VStack>
  );
}
