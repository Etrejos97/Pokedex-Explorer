import { useEffect, useState } from 'react';
import { fetchSpecies } from '../services/pokemonApi';

export const useSpecies = (speciesUrl) => {
  const [species, setSpecies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (speciesUrl === null) {
      return;
    }

    let isActive = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      setSpecies(null);
      try {
        const data = await fetchSpecies(speciesUrl);
        if (isActive) {
          setSpecies(data);
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
  }, [speciesUrl, attempt]);

  const retry = () => setAttempt((previous) => previous + 1);

  return {
    genus: species !== null ? species.genus : null,
    description: species !== null ? species.description : null,
    evolutions: species !== null ? species.evolutions : [],
    isLoading,
    error,
    retry,
  };
};