import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';
import { Router } from './src/routes';
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
      <AuthContextProvider>{fontsLoaded ? <Router /> : <Loading />}</AuthContextProvider>
    </NativeBaseProvider>
  );
}
