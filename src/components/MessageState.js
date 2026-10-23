import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import IconButton from './IconButton';

export default function MessageState({ title, message, imageUrl, actionIcon, actionLabel, onAction }) {
    return (
        <View style={styles.container}>
            {/* CONCEPTO: renderizado condicional con && */}
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {actionLabel && onAction && (
                <View style={styles.button}>
                    <IconButton icon={actionIcon} label={actionLabel} onPress={onAction} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    image: {
        width: 64,
        height: 64,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'center',
    },
    message: {
        marginTop: 8,
        color: colors.textMuted,
        textAlign: 'center',
    },
    button: {
        marginTop: 16,
    },
});