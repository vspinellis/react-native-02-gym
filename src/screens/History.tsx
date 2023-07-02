import { VStack, SectionList, Text, Heading } from 'native-base';
import ScreenHeader from '../components/ScreenHeader';
import HistoryCard from '../components/HistoryCard';
import { useState } from 'react';

export default function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['Puxada Frontal', 'Remada Unilateral']
    },
    {
      title: '27.08.22',
      data: ['Puxada Frontal']
    }
  ]);
  return (
    <VStack>
      <ScreenHeader title='Histórico de exercícios' />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
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
    </VStack>
  );
}
