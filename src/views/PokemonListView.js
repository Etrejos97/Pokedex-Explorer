import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { POKEBALL_IMAGE_URL } from '../constants/pokemon';
import { colors } from '../theme/colors';
import { getErrorMessage } from '../utils/errorMessages';

export default function PokemonListView({
    pokemons,
    isLoading,
    error,
    hasMore,
    onLoadMore,
    onSelect,
    onSearch,
}) {
    const renderFooter = () => {
        if (isLoading) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator color={colors.primary} />
                    <Text style={styles.footerText}>Cargando más pokémon...</Text>
                </View>
            );
        }
        if (error) {
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>No pude cargar más pokémon. {getErrorMessage(error)}</Text>
                    <IconButton icon="refresh" label="Reintentar" onPress={onLoadMore} />
                </View>
            );
        }
        if (!hasMore) {
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Ya viste todos los pokémon.</Text>
                </View>
            );
        }
        return null;
    };
    const renderContent = () => {
        if (error && pokemons.length === 0) {
            return (
                <MessageState
                    title="No se pudo cargar la lista"
                    message={getErrorMessage(error)}
                    actionIcon="refresh"
                    actionLabel="Reintentar"
                    onAction={onLoadMore}
                />
            );
        }
        if (isLoading && pokemons.length === 0) {
            return <LoadingState message="Cargando pokémon..." />;
        }
        return (
            <FlatList
                data={pokemons}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelect}
                />}
                numColumns={2}
                contentContainerStyle={styles.list}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleRow}>
                    <Image source={{ uri: POKEBALL_IMAGE_URL }} style={styles.pokeball} />
                    <Text style={styles.title}>PokéDex Explorer</Text>
                </View>
                <SearchBar onSearch={onSearch} />
            </View>
            {renderContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        gap: 12,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pokeball: {
        width: 36,
        height: 36,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary,
    },
    list: {
        paddingHorizontal: 10,
        paddingBottom: 16,
    },
    footer: {
        alignItems: 'center',
        padding: 16,
        gap: 8,
    },
    footerText: {
        color: colors.textMuted,
    },
});