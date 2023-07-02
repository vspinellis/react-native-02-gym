import { Center, Image, Text, VStack, Heading, ScrollView, Icon } from 'native-base';
import BackgroundImg from '../assets/background.png';
import LogoSvg from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = Yup.object({
  name: Yup.string().required('Informe o nome'),
  email: Yup.string().required('Informe o email').email('Informe o email válido'),
  password: Yup.string().required('Informe a senha').min(6, 'Mínimo de 6 caracteres'),
  password_confirm: Yup.string()
    .required('Confirme a senha')
    .oneOf([Yup.ref('password'), ''], 'As senhas não são iguais')
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log(data);
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.name?.message}
                value={value}
                placeholder='Nome'
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                value={value}
                placeholder='Email'
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                value={value}
                placeholder='Senha'
              />
            )}
          />

          <Controller
            control={control}
            name='password_confirm'
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder='Confirmação da senha'
                errorMessage={errors.password_confirm?.message}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
              />
            )}
          />

          <Button title='Criar e acessar' onPressIn={handleSubmit(handleSignUp)} />
        </Center>
        <Button
          mt={12}
          onPress={handleGoBack}
          title='Voltar para o login'
          variant='outline'
        />
      </ScrollView>
    </VStack>
  );
}
