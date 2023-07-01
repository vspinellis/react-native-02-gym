import { Center, Image, Text, VStack, Heading, ScrollView } from 'native-base';
import BackgroundImg from '../assets/background.png';
import LogoSvg from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorAuthProps } from '../routes/auth.routes';

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorAuthProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
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

          <Input
            placeholder='E-mail'
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <Input placeholder='Senha' secureTextEntry />
          <Button title='Acessar' />
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
