import { Image, StyleSheet, Text, View } from 'react-native';
import { POKEMON_TYPES, UNKNOWN_TYPE } from '../constants/pokemon';

export default function TypeBadge({ type }) {
    const typeInfo = POKEMON_TYPES[type.name] || UNKNOWN_TYPE;

    return (
        <View style={[styles.badge, { backgroundColor: typeInfo.color }]}>
            {/* CONCEPTO: imagen remota con width y height explícitos */}
            <Image source={{ uri: type.iconUrl }} style={styles.icon} />
            <Text style={styles.text}>{typeInfo.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingLeft: 4,
        paddingRight: 12,
        paddingVertical: 4,
        borderRadius: 999,
    },
    icon: {
        width: 22,
        height: 22,
        borderRadius: 11,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});