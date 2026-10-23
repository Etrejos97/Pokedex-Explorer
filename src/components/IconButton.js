import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

export default function IconButton({ icon, label, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        >
            {/* CONCEPTO: íconos de @expo/vector-icons */}
            <MaterialCommunityIcons name={icon} size={20} color="#FFFFFF" />
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    label: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});