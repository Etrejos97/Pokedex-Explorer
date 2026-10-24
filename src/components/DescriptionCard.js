import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { getErrorMessage } from '../utils/errorMessages';
import IconButton from './IconButton';

export default function DescriptionCard({ description, isLoading, error, onRetry }) {
  const renderBody = () => {
    if (isLoading) {
      return (
        <View style={styles.state}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.muted}>Cargando descripción...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.state}>
          <Text style={styles.muted}>
            No se pudo cargar la descripción. {getErrorMessage(error)}
          </Text>
          <IconButton icon="refresh" label="Reintentar" onPress={onRetry} />
        </View>
      );
    }
    if (description === null) {
      return <Text style={styles.muted}>Este pokémon todavía no tiene descripción en español.</Text>;
    }
    return <Text style={styles.text}>{description}</Text>;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Descripción</Text>
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
  muted: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  text: {
    color: colors.text,
    lineHeight: 22,
  },
});