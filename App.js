import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { usePokemonList } from './src/hooks/usePokemonList';
import { colors } from './src/theme/colors';
import PokemonDetailView from './src/views/PokemonDetailView';
import PokemonListView from './src/views/PokemonListView';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const pokemonList = usePokemonList();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <PokemonListView
            pokemons={pokemonList.pokemons}
            isLoading={pokemonList.isLoading}
            error={pokemonList.error}
            hasMore={pokemonList.hasMore}
            onLoadMore={pokemonList.loadMore}
            onSelect={setSelectedPokemon}
            onSearch={setSelectedPokemon}
          />
          {selectedPokemon !== null && (
            <View style={styles.detailLayer}>
              <PokemonDetailView
                nameOrId={selectedPokemon}
                onBack={() => setSelectedPokemon(null)}
              />
            </View>
          )}
        </View>
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  detailLayer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
});