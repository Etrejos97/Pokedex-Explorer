import { StyleSheet, Text, View } from 'react-native';
import { MAX_STAT_VALUE, STAT_LABELS } from '../constants/pokemon';
import { colors } from '../theme/colors';

export default function StatBar({ name, value, color }) {
    const label = STAT_LABELS[name] || name;

    const percent = (value / MAX_STAT_VALUE) * 100;

    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.track}>
                <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 96,
        color: colors.textMuted,
    },
    value: {
        width: 36,
        fontWeight: 'bold',
        color: colors.text,
        textAlign: 'right',
        marginRight: 8,
    },
    track: {
        flex: 1,
        height: 8,
        backgroundColor: colors.track,
        borderRadius: 4,
        overflow: 'hidden',
    },
    fill: {
        height: 8,
        borderRadius: 4,
    },
});