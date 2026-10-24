# PokéDex Explorer

App hecha con Expo que consume la [PokéAPI](https://pokeapi.co/): lista los pokémon con scroll infinito, permite buscarlos por nombre o número y muestra la ficha de cada uno con su imagen, tipos, medidas y estadísticas base.

## Cómo correrla

```bash
npm install
npx expo start
```

Escaneo el QR con Expo Go (Android) o con la cámara (iOS).

## Árbol de carpetas

```
pokedex-explorer/
├── App.js                       # Punto de entrada: decide si se ve la lista o la ficha
└── src/
    ├── services/
    │   └── pokemonApi.js        # Único archivo que llama a la PokéAPI con fetch
    ├── hooks/
    │   ├── usePokemonList.js    # Estado de la lista: páginas, carga, error y scroll infinito
    │   ├── usePokemonDetail.js  # Estado de la ficha: carga, error, sin resultados y reintento
    │   └── useEvolutionChain.js # Estado de la cadena de evolución de la ficha, con su propio reintento
    ├── views/
    │   ├── PokemonListView.js   # Vista de lista: título, buscador y cuadrícula de 2 columnas
    │   └── PokemonDetailView.js # Vista de detalle: imagen, tipos, medidas y estadísticas
    ├── components/
    │   ├── PokemonCard.js       # Tarjeta de la cuadrícula (imagen, #número y nombre)
    │   ├── SearchBar.js         # TextInput + botón "Buscar"; limpia el texto antes de buscar
    │   ├── IconButton.js        # Botón con ícono (@expo/vector-icons) y texto, hecho con Pressable
    │   ├── TypeBadge.js         # Distintivo de color por tipo, con su ícono
    │   ├── StatBar.js           # Fila de estadística con barra proporcional a 255
    │   ├── EvolutionSection.js  # Sección "Evoluciones" de la ficha: de a 3 por fila, con su fase
    │   ├── LoadingState.js      # Estado "cargando": indicador + texto
    │   └── MessageState.js      # Estados "error" y "sin resultados", con botón opcional
    ├── constants/
    │   └── pokemon.js           # Tipos y estadísticas en español, colores por tipo, máximo 255, sprite de la Poké Ball
    ├── utils/
    │   ├── formatters.js        # formatNumber (#025) y capitalize (Pikachu)
    │   └── errorMessages.js     # Mensaje de error según el código HTTP (sin internet, 4xx o 5xx)
    └── theme/
        └── colors.js            # Colores generales de la app
```

## Por qué lo organicé así

La regla del taller es que las llamadas a la API no queden mezcladas con los estilos y el JSX. Por eso separé la app en capas, y cada una solo conoce a la de abajo:

1. **`services/`** sabe hablar con la API: arma la URL, revisa `response.ok`, convierte el JSON y lo deja con los campos que la app usa (por ejemplo, divide la altura y el peso entre 10). Si mañana cambia la API, solo toco este archivo.
2. **`hooks/`** guarda el estado (`useState`) y decide cuándo pedir los datos (`useEffect`). Aquí viven las reglas de carga, error, reintento y scroll infinito.
3. **`views/`** pinta según el estado que le da el hook. No tiene ningún `fetch`.
4. **`components/`** son piezas pequeñas que reciben props y no saben de dónde vienen los datos. Por ejemplo, `LoadingState` y `MessageState` se usan en las dos vistas.

`constants/`, `utils/` y `theme/` guardan datos y funciones que no son de ninguna pantalla en particular.

La lista nunca se quita de la pantalla: la ficha se dibuja encima, en una capa con `StyleSheet.absoluteFill`. Si la lista se quitara al abrir la ficha, al volver la `FlatList` se crearía de nuevo y el scroll empezaría desde el primer pokémon. Así, al cerrar la ficha, la lista sigue en el pokémon que abrí. El hook de la lista se llama en `App.js` para que la vista de lista solo pinte lo que recibe por props.

Las imágenes salen de la PokéAPI y de su repositorio de sprites (artwork, íconos de tipo y Poké Ball), y los íconos de los botones y de las medidas, de `@expo/vector-icons`, que viene con Expo.

Para mostrar u ocultar la ficha uso un estado (`selectedPokemon`) en lugar de una librería de navegación. El taller pide una pantalla con dos vistas y solo instala `react-native-safe-area-context`.

## Evoluciones

La ficha muestra la cadena de evolución del pokémon de a 3 por fila, cada uno con su fase (Básico, Fase 1 o Fase 2, los nombres del juego de cartas en español). Tocar una evolución abre su ficha.

- La ficha trae `species.url`. La especie trae `evolution_chain.url`, y esa URL trae la cadena: son dos peticiones más, en `fetchEvolutionChain`.
- La cadena llega como un árbol (`evolves_to`). La recorro por fases con un `while`: la fase siguiente son todos los `evolves_to` de la fase actual. Así salen bien las cadenas con ramas, como Eevee (8 evoluciones) o Wurmple (2 caminos), sin recursión.
- Las evoluciones tienen su propio hook (`useEvolutionChain`): la ficha aparece apenas llega, y si la cadena falla, solo esa sección muestra "Reintentar".

## Códigos HTTP

Cada función del servicio revisa `response.ok` antes de `response.json()`. Si la respuesta no es un 2xx, lanza un error que lleva el código en `error.status`, y `getErrorMessage` elige el mensaje:

| Caso | Qué pasa | Qué ve el usuario |
|---|---|---|
| 200 | Llegan los datos | La lista o la ficha |
| 404 en la ficha | El pokémon no existe: no es una falla | "Sin resultados", sin "Reintentar" |
| Otro 4xx (error del cliente) | La API no aceptó la petición | "La PokéAPI rechazó la petición (error 400)." |
| 5xx (error del servidor) | La petición estaba bien, falló la API | "La PokéAPI tiene un problema (error 503)..." |
| Sin respuesta | No hay internet: `fetch` falla sin código | "No se pudo conectar con la PokéAPI..." |

El buscador cambia los espacios por guiones porque la API responde 400 con un espacio (`mr mime`) y encuentra el nombre con guion (`mr-mime`).

## Estados de la interfaz

| Estado | Lista | Ficha |
|---|---|---|
| Cargando | Indicador con texto en la primera carga y al final de la lista al cargar más | Indicador con texto |
| Error | Mensaje según el código HTTP + botón "Reintentar" | Mensaje según el código HTTP + botón "Reintentar" |
| Sin resultados | — | Mensaje cuando el nombre buscado no existe (la API responde 404) |
| Éxito | Cuadrícula de 2 columnas | Ficha completa |

La sección de evoluciones tiene sus propios estados: "Cargando evoluciones...", error con "Reintentar" y "Este pokémon no evoluciona".