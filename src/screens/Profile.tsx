import { VStack, Text, ScrollView, Center } from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import { UserPhoto } from '../components/UserPhoto';

export default function Profile() {
  return (
    <VStack>
      <ScreenHeader title='Perfil' />
      <ScrollView>
        <Center mt={6} px={10}>
          <UserPhoto
            source={{ uri: 'https://github.com/vspinellis.png' }}
            alt='Foto do usuário'
            size={33}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
