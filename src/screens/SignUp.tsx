import { Center, Image, Text, VStack, Heading, ScrollView, Icon } from 'native-base';
import BackgroundImg from '../assets/background.png';
import LogoSvg from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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

          <Input placeholder='Nome' />
          <Input placeholder='E-mail' keyboardType='email-address' />
          <Input placeholder='Senha' secureTextEntry />
          <Button title='Criar e acessar' />
        </Center>
        <Button
          mt={24}
          onPress={handleGoBack}
          title='Voltar para o login'
          variant='outline'
        />
      </ScrollView>
    </VStack>
  );
}
