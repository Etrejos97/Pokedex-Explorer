import { useEffect, useState } from 'react';
import { fetchEvolutionChain } from '../services/pokemonApi';

export const useEvolutionChain = (speciesUrl) => {
  const [evolutions, setEvolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setEvolutions([]);
      try {
        const data = await fetchEvolutionChain(speciesUrl);
        if (isActive) {
          setEvolutions(data);
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

  return { evolutions, isLoading, error, retry };
};