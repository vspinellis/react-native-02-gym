import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base';
import { HomeHeader } from '../components/HomeHeader';
import { Group } from '../components/Group';
import { useCallback, useEffect, useState } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../routes/app.routes';
import { AppError } from '../utils/AppError';
import { API } from '../service/api';
import { ExerciseDTO } from '../dtos/ExerciseDTO';
import { Loading } from '../components/Loading';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [groupSelected, setGroupSelected] = useState('antebraço');
  const [groups, setGroups] = useState<Array<string>>([]);
  const toast = useToast();
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchGroups() {
    try {
      const { data } = await API.get('/groups');
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setLoading(true);
      const { data } = await API.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setLoading(false);
    }
  }

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack>
      <HomeHeader />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
          />
        )}
        _contentContainerStyle={{
          px: 8
        }}
        my={10}
        maxH={10}
        minH={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8}>
          <HStack justifyContent='space-between' mb={5}>
            <Heading color='gray.200' fontFamily='heading' fontSize='md'>
              Exercícios
            </Heading>
            <Text color='gray.200' fontSize='sm'>
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20
            }}
          />
        </VStack>
      )}
    </VStack>
  );
}
