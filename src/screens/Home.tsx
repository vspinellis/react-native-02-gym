import { FlatList, HStack, Heading, Text, VStack } from 'native-base';
import { HomeHeader } from '../components/HomeHeader';
import { Group } from '../components/Group';
import { useState } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';

export default function Home() {
  const [groupSelected, setGroupSelected] = useState('COSTAS');
  const [groups, setGroups] = useState(['COSTAS', 'BÍCEPS', 'OMBRO']);
  const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Lateral']);
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
        maxHeight={10}
      />

      <VStack px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>
          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20
          }}
        />
      </VStack>
    </VStack>
  );
}
