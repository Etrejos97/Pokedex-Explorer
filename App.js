import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { usePokemonList } from './src/hooks/usePokemonList';
import { colors } from './src/theme/colors';
import PokemonListView from './src/views/PokemonListView';

export default function App() {
  const pokemonList = usePokemonList();
  const showInConsole = (nameOrId) => console.log('Abrir ficha de:', nameOrId);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <PokemonListView
          pokemons={pokemonList.pokemons}
          isLoading={pokemonList.isLoading}
          error={pokemonList.error}
          hasMore={pokemonList.hasMore}
          onLoadMore={pokemonList.loadMore}
          onSelect={showInConsole}
          onSearch={showInConsole}
        />
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
});