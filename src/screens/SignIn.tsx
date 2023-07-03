import { Center, Image, Text, VStack, Heading, ScrollView, useToast } from 'native-base';
import BackgroundImg from '../assets/background.png';
import LogoSvg from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '../routes/auth.routes';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../hooks/useAuth';
import { AppError } from '../utils/AppError';
import { useState } from 'react';

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = Yup.object({
  email: Yup.string().required('Email é requirido').email('Digite um email válido'),
  password: Yup.string().required('Senha é requirida').min(6, 'Mínimo de 6 caracteres')
});

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });
  const { signIn } = useAuth();
  const toast = useToast();
  const navigation = useNavigation<AuthNavigatorAuthProps>();
  const [isLoading, setIsLoading] = useState(false);

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  async function handleLogin({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível acessar a conta';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack px={5} flex={1}>
      <Image
        defaultSource={BackgroundImg}
        resizeMode='contain'
        source={BackgroundImg}
        position='absolute'
        alt='Pessoas usando aparelhos em uma academia'
      />
      <Center my={24}>
        <LogoSvg />
        <Text color='gray.100' fontSize='sm'>
          Treine sua mente e o seu corpo
        </Text>
      </Center>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Center>
          <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
            Acesse sua conta
          </Heading>

          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                errorMessage={errors.email?.message}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                placeholder='Senha'
                secureTextEntry
              />
            )}
          />
          <Button
            isLoading={isLoading}
            onPress={handleSubmit(handleLogin)}
            title='Acessar'
          />
        </Center>
        <Center mt={24}>
          <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body'>
            Ainda não tem acesso?
          </Text>
          <Button title='Criar conta' onPress={handleNewAccount} variant='outline' />
        </Center>
      </ScrollView>
    </VStack>
  );
}
