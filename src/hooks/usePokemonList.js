import { useEffect, useRef, useState } from 'react';
import { fetchPokemonPage } from '../services/pokemonApi';

export const usePokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const isLoadingRef = useRef(false);
    const offsetRef = useRef(0);

    const loadMore = async () => {
        if (isLoadingRef.current || !hasMore) {
            return;
        }
        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const page = await fetchPokemonPage(offsetRef.current);
            offsetRef.current += page.items.length;
            setPokemons((previous) => [...previous, ...page.items]);
            setHasMore(page.hasMore);
        } catch (err) {
            setError(err);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadMore();
    }, []);

    return { pokemons, isLoading, error, hasMore, loadMore };
};