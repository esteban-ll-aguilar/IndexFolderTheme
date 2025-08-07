# Folder Tree Colors

Una extensión de VS Code que añade colores visuales a los niveles de carpetas en el explorador, similar al efecto de Indent Rainbow pero aplicado al árbol de archivos.

## Características

- 🌈 **Múltiples esquemas de colores**: Rainbow, tonos azules, tonos cálidos, tonos fríos y monocromático
- 🎨 **Personalización completa**: Ajusta opacidad, grosor de bordes y esquemas de colores
- ⚡ **Activación instantánea**: Se activa automáticamente al abrir VS Code
- 🔧 **Comandos fáciles**: Toggle y refresh mediante comandos de paleta

## Instalación

### Desde el código fuente

1. Clona o descarga este repositorio
2. Abre una terminal en el directorio del proyecto
3. Ejecuta los siguientes comandos:

```bash
npm install
npm run compile
```

4. Presiona `F5` para abrir una nueva ventana de VS Code con la extensión cargada
5. O empaqueta la extensión:

```bash
npm install -g vsce
vsce package
```

Luego instala el archivo `.vsix` generado usando `Extensions: Install from VSIX...`
## Uso

### Comandos disponibles

Abre la paleta de comandos (`Ctrl+Shift+P` / `Cmd+Shift+P`) y busca:
### Configuración

Ve a `File > Preferences > Settings` y busca "Folder Tree Colors" o edita tu `settings.json`:

```json
{
  "folderTreeColors.enabled": true,
  "folderTreeColors.opacity": 0.1,
  "folderTreeColors.borderWidth": 1,
  "folderTreeColors.colorScheme": "rainbow"
}
```

#### Opciones de configuración

- **`folderTreeColors.enabled`** (boolean, default: `true`)
  - Habilita o deshabilita la extensión

- **`folderTreeColors.opacity`** (number, default: `0.1`)
  - Controla la opacidad de los colores de fondo (0.05 - 0.5)

- **`folderTreeColors.borderWidth`** (number, default: `1`)
  - Grosor del borde izquierdo en píxeles (0 - 5)

- **`folderTreeColors.colorScheme`** (string, default: `"rainbow"`)
  - Esquema de colores a usar:
    - `"rainbow"` - Colores del arcoíris variados
    - `"blue-tones"` - Diferentes tonos de azul
    - `"warm-tones"` - Tonos cálidos (naranjas, amarillos)
    - `"cool-tones"` - Tonos fríos (verdes, azules)

    - `"monochrome"` - Escala de grises

## Esquemas de colores

### Rainbow (Arcoíris)
Colores vibrantes y variados que crean un efecto visual llamativo.
### Warm Tones (Tonos Cálidos)
Colores cálidos como naranjas, amarillos y rojos suaves.

### Cool Tones (Tonos Fríos)
Colores fríos como verdes y azules en diferentes intensidades.

### Monochrome (Monocromático)
Escala de grises para un look más sutil y profesional.

## Cómo funciona

La extensión utiliza el sistema de personalización de colores de VS Code (`workbench.colorCustomizations`) para aplicar colores a diferentes elementos del explorador de archivos:

- Fondo de selección inactiva
- Fondo al pasar el mouse
- Guías de indentación del árbol
- Fondo de selección activa
- Fondo de enfoque

## Desarrollo

### Estructura del proyecto

```
folder-tree-colors/
├── src/
│   └── extension.ts      # Código principal de la extensión
├── package.json          # Manifiesto de la extensión
├── tsconfig.json         # Configuración de TypeScript
└── README.md            # Este archivo
```

### Scripts disponibles

- `npm run compile` - Compila el código TypeScript
- `npm run watch` - Compila en modo watch para desarrollo

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Licencia

MIT License - ve el archivo LICENSE para más detalles.

## Changelog

### 1.0.0
- Lanzamiento inicial
- Soporte para múltiples esquemas de colores
- Configuración personalizable
- Comandos de toggle y refresh
