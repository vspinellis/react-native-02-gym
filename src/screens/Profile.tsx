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
import { TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { API } from '../service/api';
import { AppError } from '../utils/AppError';

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = Yup.object({
  name: Yup.string()
    .required('Informe o nome')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirm_password: Yup.string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([Yup.ref('password'), ''], 'Senhas devem ser iguais')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .transform((value) => (!!value ? value : null))
          .required('Informe a confirmação da senha.')
    })
});

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [isUpdating, setUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });
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

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setUpdating(true);
      const userUpdated = user;
      userUpdated.name = data.name;

      await API.put('/users', { data });

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar o perfil';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setUpdating(false);
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

          <Controller
            name='name'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg='gray.600'
                errorMessage={errors.name?.message}
                onChangeText={onChange}
                placeholder='Nome'
                value={value}
              />
            )}
          />

          <Controller
            name='email'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input bg='gray.600' isDisabled placeholder='Email' value={value} />
            )}
          />
        </Center>
        <VStack px={10} mb={9}>
          <Heading color='gray.200' fontFamily='heading' fontSize='md' mb={2} mt={12}>
            Alterar senha
          </Heading>
          <Controller
            name='old_password'
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input bg='gray.600' placeholder='Senha antiga' secureTextEntry />
            )}
          />
          <Controller
            name='password'
            errorMessage={errors.password?.message}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input bg='gray.600' placeholder='Nova senha' secureTextEntry />
            )}
          />
          <Controller
            name='confirm_password'
            control={control}
            errorMessage={errors.confirm_password?.message}
            render={({ field: { value, onChange } }) => (
              <Input bg='gray.600' placeholder='Confirme a nova senha' secureTextEntry />
            )}
          />

          <Button onPress={handleSubmit(handleProfileUpdate)} title='Atualizar' mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
