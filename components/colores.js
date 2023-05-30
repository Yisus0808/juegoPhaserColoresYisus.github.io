export const coloresDefault = [
    { nombre: 'Rojo', color: '#FF0000', correcto: true },
    { nombre: 'Azul', color: '#0000FF', correcto: true },
    { nombre: 'Verde', color: '#00FF00', correcto: true },
    { nombre: 'Amarillo', color: '#FFFF00', correcto: true },
    { nombre: 'Naranja', color: '#FFA500', correcto: true },
    { nombre: 'Rosa', color: '#FFC0CB', correcto: true },
    { nombre: 'Morado', color: '#800080', correcto: true },
    { nombre: 'Gris', color: '#808080', correcto: true },
    { nombre: 'Negro', color: '#000000', correcto: true },
    { nombre: 'Cian', color: '#00FFFF', correcto: true },
    { nombre: 'Magenta', color: '#FF00FF', correcto: true },
    { nombre: 'Lima', color: '#00FF00', correcto: true },
    { nombre: 'Plata', color: '#C0C0C0', correcto: true },
    { nombre: 'Oro', color: '#FFD700', correcto: true },
    { nombre: 'Coral', color: '#FF7F50', correcto: true },
    { nombre: 'Turquesa', color: '#40E0D0', correcto: true },
    { nombre: 'Rojo', color: '#0000FF', correcto: false },
    { nombre: 'Azul', color: '#00FF00', correcto: false },
    { nombre: 'Verde', color: '#000000', correcto: false },
    { nombre: 'Amarillo', color: '#FF0000', correcto: false },
    { nombre: 'Naranja', color: '#0004FF', correcto: false },
    { nombre: 'Rosa', color: '#00A6FF', correcto: false },
    { nombre: 'Morado', color: '#FFCD00', correcto: false },
    { nombre: 'Gris', color: '#00FF0F', correcto: false },
    { nombre: 'Negro', color: '#FF0400', correcto: false },
    { nombre: 'Cian', color: '#F700FF', correcto: false },
    { nombre: 'Magenta', color: '#FFA500', correcto: false },
    { nombre: 'Lima', color: '#000FFF', correcto: false },
    { nombre: 'Plata', color: '#8F00FF', correcto: false },
    { nombre: 'Oro', color: '#00FF00', correcto: false },
    { nombre: 'Coral', color: '#FF0093', correcto: false },
    { nombre: 'Turquesa', color: '#00FF42', correcto: false }
];

export const obtenerColoresDesordenados = () => {
    const coloresDesordenados  = [];
    const coloresDisponibles = [...coloresDefault];

    while (coloresDesordenados.length < 10 && coloresDisponibles.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * coloresDisponibles.length);
        const colorSeleccionado = coloresDisponibles[indiceAleatorio];
        coloresDesordenados.push(colorSeleccionado);
        coloresDisponibles.splice(indiceAleatorio, 1);
      }

    return coloresDesordenados;
};