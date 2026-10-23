const BASE_URL = 'https://pokeapi.co/api/v2';

const ARTWORK_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

const TYPE_ICON_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/small';

export const PAGE_SIZE = 20;

const getIdFromUrl = (url) => {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
};

const getArtworkUrl = (id) => `${ARTWORK_URL}/${id}.png`;

const getTypeIconUrl = (typeId) => `${TYPE_ICON_URL}/${typeId}.png`;

const createHttpError = (response) => {
    const error = new Error(`Error HTTP ${response.status}`);
    error.status = response.status;
    return error;
};

export const fetchPokemonPage = async (offset) => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);

    if (!response.ok) {
        throw createHttpError(response);
    }

    const data = await response.json();

    const items = data.results.map((pokemon) => {
        const id = getIdFromUrl(pokemon.url);
        return {
            id,
            name: pokemon.name,
            imageUrl: getArtworkUrl(id),
        };
    });

    return { items, hasMore: data.next !== null };
};

export const fetchPokemonDetail = async (nameOrId) => {
    const response = await fetch(`${BASE_URL}/pokemon/${encodeURIComponent(nameOrId)}`);

    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw createHttpError(response);
    }

    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
        imageUrl: data.sprites.other['official-artwork'].front_default,
        heightMeters: data.height / 10,
        weightKg: data.weight / 10,
        types: data.types.map((item) => ({
            name: item.type.name,
            iconUrl: getTypeIconUrl(getIdFromUrl(item.type.url)),
        })),
        stats: data.stats.map((item) => ({
            name: item.stat.name,
            value: item.base_stat,
        })),
    };
}