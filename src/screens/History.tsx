import { VStack, SectionList, Text, Heading, useToast } from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import HistoryCard from '../components/HistoryCard';
import { useCallback, useEffect, useState } from 'react';
import { AppError } from '../utils/AppError';
import { API } from '../service/api';
import { useFocusEffect } from '@react-navigation/native';
import { HistoryDTO } from '../dtos/HistoryDTO';
import { Loading } from '../components/Loading';

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [exercises, setExercises] = useState<HistoryDTO[]>([]);

  async function fetchHistory() {
    setIsLoading(true);
    try {
      const { data } = await API.get('/history');
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar o histórico';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack>
      <ScreenHeader title='Histórico de exercícios' />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: 'center' }
          }
          renderSectionHeader={({ section }) => (
            <Heading color='gray.200' fontSize='md' fontFamily='heading' mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          ListEmptyComponent={() => (
            <Text>Não há exercícios registrados ainda. {'\n'} Bora?</Text>
          )}
        />
      )}
    </VStack>
  );
}
