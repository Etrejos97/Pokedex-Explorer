
export const getErrorMessage = (error) => {
    if (error.status === undefined) {
        return 'No se pudo conectar con la PokéAPI. Revisa tu conexión a internet e intenta de nuevo.';
    }
    if (error.status >= 500) {
        return `La PokéAPI tiene un problema (error ${error.status}). Intenta de nuevo en un momento.`;
    }
    return `La PokéAPI rechazó la petición (error ${error.status}).`;
};