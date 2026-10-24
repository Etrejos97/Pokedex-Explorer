import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { getErrorMessage } from '../utils/errorMessages';
import { capitalize, formatEvolutionStage } from '../utils/formatters';
import IconButton from './IconButton';

export default function EvolutionSection({
  evolutions,
  isLoading,
  error,
  onRetry,
  currentName,
  onSelect,
}) {
  const renderBody = () => {
    if (isLoading) {
      return (
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.stateText}>Cargando evoluciones...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.state}>
          <Text style={styles.stateText}>
            No se pudieron cargar las evoluciones. {getErrorMessage(error)}
          </Text>
          <IconButton icon="refresh" label="Reintentar" onPress={onRetry} />
        </View>
      );
    }
    if (evolutions.length <= 1) {
      return <Text style={styles.stateText}>Este pokémon no evoluciona.</Text>;
    }

    return (
      <View style={styles.grid}>
        {evolutions.map((item) => (
          <Pressable
            key={item.name}
            onPress={() => onSelect(item.name)}
            style={({ pressed }) => [
              styles.item,
              item.name === currentName && styles.itemCurrent,
              pressed && { opacity: 0.7 },
            ]}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{capitalize(item.name)}</Text>
            <Text style={styles.stage}>{formatEvolutionStage(item.stage)}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Evoluciones</Text>
      {renderBody()}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  state: {
    alignItems: 'center',
    gap: 8,
  },
  stateText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    width: '31%',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  itemCurrent: {
    borderColor: colors.primary,
  },
  image: {
    width: 64,
    height: 64,
  },
  name: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  stage: {
    fontSize: 11,
    color: colors.textMuted,
  },
});