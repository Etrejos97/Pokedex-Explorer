import { useEffect, useState } from 'react';
import { fetchPokemonDetail } from '../services/pokemonApi';

export const usePokemonDetail = (nameOrId) => {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let isActive = true;

        const load = async () => {
            setIsLoading(true);
            setError(null);
            setPokemon(null);
            try {
                const data = await fetchPokemonDetail(nameOrId);
                if (isActive) {
                    setPokemon(data);
                }
            } catch (err) {
                if (isActive) {
                    setError(err);
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        load();

        return () => {
            isActive = false;
        };
    }, [nameOrId, attempt]);

    const retry = () => setAttempt((previous) => previous + 1);

    return { pokemon, isLoading, error, retry };
};