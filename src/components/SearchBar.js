import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import IconButton from './IconButton';

export default function SearchBar({ onSearch }) {
    const [text, setText] = useState('');
    const inputRef = useRef(null);
    const handleSearch = () => {
        inputRef.current.blur();
        const query = text.trim().toLowerCase().replace('#', '').split(' ').join('-');
        if (query === '') {
            return;
        }
        if (!isNaN(query)) {
            onSearch(String(Number(query)));
            return;
        }
        onSearch(query);
    };

    return (
        <View style={styles.container}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Busca por nombre o número"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />
            <IconButton icon="magnify" label="Buscar" onPress={handleSearch} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        color: colors.text,
    },
});