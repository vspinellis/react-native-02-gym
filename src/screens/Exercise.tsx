import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import BodySvg from '../assets/body.svg';
import SeriesSvg from '../assets/series.svg';
import RepetitionsSvg from '../assets/repetitions.svg';
import { Button } from '../components/Button';
import { API } from '../service/api';
import { AppError } from '../utils/AppError';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '../dtos/ExerciseDTO';
import { Loading } from '../components/Loading';

export default function Exercise() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const { params } = useRoute<
    RouteProp<ParamListBase> & { params: { exerciseId: string } }
  >();
  const navigation = useNavigation();
  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    setIsLoading(true);
    try {
      const { data } = await API.get(`/exercises/${params.exerciseId}`);
      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    setSendingRegister(true);

    await API.post('/history', { exercise_id: params.exerciseId });

    toast.show({
      title: 'Exercício registrado no seu histórico',
      placement: 'top',
      bgColor: 'green.700'
    });

    navigation.navigate('history');

    try {
      const { data } = await API.get(`/exercises/${params.exerciseId}`);
      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [params.exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg='gray.600' pt={12}>
        <TouchableOpacity>
          <Icon
            onPress={handleGoBack}
            as={Feather}
            name='arrow-left'
            color='green.500'
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center'>
          <Heading color='gray.100' flexShrink={1} fontSize='lg' fontFamily='heading'>
            {exercise.name}
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' ml={1} textTransform='capitalize'>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded='lg' mb={3} overflow='hidden'>
              <Image
                w='full'
                h={80}
                source={{
                  uri: `${API.defaults.baseURL}/exercise/demo/${exercise.demo}`
                }}
                alt='Nome do exercício'
                mb={3}
                resizeMode='cover'
                rounded='lg'
              />
            </Box>

            <Box bg='gray.600' rounded='md' pb={4} px={4}>
              <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color='gray.200' ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color='gray.200' ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                onPress={handleExerciseHistoryRegister}
                isLoading={sendingRegister}
                title='Marcar como realizado'
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
