import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import EvolutionSection from '../components/EvolutionSection';
import IconButton from '../components/IconButton';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import StatBar from '../components/StatBar';
import TypeBadge from '../components/TypeBadge';
import { POKEBALL_IMAGE_URL, POKEMON_TYPES, UNKNOWN_TYPE } from '../constants/pokemon';
import { useEvolutionChain } from '../hooks/useEvolutionChain';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { colors } from '../theme/colors';
import { getErrorMessage } from '../utils/errorMessages';
import { capitalize, formatNumber } from '../utils/formatters';

export default function PokemonDetailView({ nameOrId, onBack, onSelect }) {
  const { pokemon, isLoading, error, retry } = usePokemonDetail(nameOrId);

  const evolution = useEvolutionChain(pokemon ? pokemon.speciesUrl : null);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState message="Cargando ficha..." />;
    }
    if (error) {
      return (
        <MessageState
          title="No se pudo cargar la ficha"
          message={getErrorMessage(error)}
          actionIcon="refresh"
          actionLabel="Reintentar"
          onAction={retry}
        />
      );
    }
    if (pokemon === null) {
      return (
        <MessageState
          imageUrl={POKEBALL_IMAGE_URL}
          title="Sin resultados"
          message={`No encontré ningún pokémon llamado "${nameOrId}". Revisa el nombre o prueba con un número.`}
        />
      );
    }

    const mainColor = (POKEMON_TYPES[pokemon.types[0].name] || UNKNOWN_TYPE).color;

    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
        <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type.name} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <View style={styles.measure}>
            <MaterialCommunityIcons name="human-male-height" size={24} color={colors.textMuted} />
            <Text style={styles.measureValue}>{pokemon.heightMeters} m</Text>
            <Text style={styles.measureLabel}>Altura</Text>
          </View>
          <View style={styles.measure}>
            <MaterialCommunityIcons name="weight-kilogram" size={24} color={colors.textMuted} />
            <Text style={styles.measureValue}>{pokemon.weightKg} kg</Text>
            <Text style={styles.measureLabel}>Peso</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Estadísticas base</Text>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} color={mainColor} />
          ))}
        </View>

        <EvolutionSection
          evolutions={evolution.evolutions}
          isLoading={evolution.isLoading}
          error={evolution.error}
          onRetry={evolution.retry}
          currentName={pokemon.name}
          onSelect={onSelect}
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <IconButton icon="arrow-left" label="Volver a la lista" onPress={onBack} />
      </View>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'flex-start',
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 220,
    height: 220,
  },
  number: {
    marginTop: 8,
    color: colors.textMuted,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  types: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  measures: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 20,
  },
  measure: {
    alignItems: 'center',
  },
  measureValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  measureLabel: {
    color: colors.textMuted,
  },
  card: {
    alignSelf: 'stretch',
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
});