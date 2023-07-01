import {
  VStack,
  Text,
  ScrollView,
  Center,
  Skeleton,
  Heading,
  useToast
} from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import { UserPhoto } from '../components/UserPhoto';
import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/vspinellis.png');
  const toast = useToast();
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        selectionLimit: 1,
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }
      const photoInfo = (await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri
      )) as FileSystem.FileInfo & { size: number };

      if (photoInfo.size / 1024 / 1024 > 3) {
        toast.show({
          title: 'Escolha uma imagem de até 3MB',
          placement: 'top',
          bgColor: 'red.500'
        });
        return;
      }

      setUserPhoto(photoSelected.assets[0].uri);
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
              size={PHOTO_SIZE}
            />
          </Skeleton>
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
