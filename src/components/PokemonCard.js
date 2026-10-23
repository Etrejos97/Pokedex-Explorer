import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { capitalize, formatNumber } from '../utils/formatters';

export default function PokemonCard({ pokemon, onPress }) {
    return (
        <Pressable style={styles.card} onPress={() => onPress(pokemon.name)}>
            <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
            <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 12,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 96,
    height: 96,
  },
  number: {
    marginTop: 6,
    fontSize: 12,
    color: colors.textMuted,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});