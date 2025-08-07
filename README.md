# Folder Tree Colors

A VS Code extension that adds visual colors to folder levels in the explorer, similar to the Indent Rainbow effect but applied to the file tree.

## Features

- 🌈 **Multiple color schemes**: Rainbow, blue tones, warm tones, cool tones, and monochrome
- 🎨 **Full customization**: Adjust opacity, border thickness, and color schemes
- ⚡ **Instant activation**: Automatically activates when VS Code opens
- 🔧 **Easy commands**: Toggle and refresh using palette commands

## Installation

### From source code

1. Clone or download this repository
2. Open a terminal in the project directory
3. Run the following commands:

```bash
npm install
npm run compile
```

4. Press `F5` to open a new VS Code window with the extension loaded
5. Or package the extension:

```bash
npm install -g vsce
vsce package
```

Then install the generated `.vsix` file using `Extensions: Install from VSIX...`

## Usage

### Available commands

Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for:

### Configuration

Go to `File > Preferences > Settings` and search for "Folder Tree Colors" or edit your `settings.json`:

```json
{
  "folderTreeColors.enabled": true,
  "folderTreeColors.opacity": 0.1,
  "folderTreeColors.borderWidth": 1,
  "folderTreeColors.colorScheme": "rainbow"
}
```

#### Configuration options

- **`folderTreeColors.enabled`** (boolean, default: `true`)
  - Enables or disables the extension

- **`folderTreeColors.opacity`** (number, default: `0.1`)
  - Controls the background color opacity (0.05 - 0.5)

- **`folderTreeColors.borderWidth`** (number, default: `1`)
  - Left border thickness in pixels (0 - 5)

- **`folderTreeColors.colorScheme`** (string, default: `"rainbow"`)
  - Color scheme to use:
    - `"rainbow"` - Various rainbow colors
    - `"blue-tones"` - Different shades of blue
    - `"warm-tones"` - Warm tones (oranges, yellows)
    - `"cool-tones"` - Cool tones (greens, blues)
    - `"monochrome"` - Grayscale

## Color Schemes

### Rainbow
Vibrant and varied colors for a striking visual effect.

### Warm Tones
Warm colors like oranges, yellows, and soft reds.

### Cool Tones
Cool colors like greens and blues in different intensities.

### Monochrome
Grayscale for a more subtle and professional look.

## How it works

The extension uses VS Code's color customization system (`workbench.colorCustomizations`) to apply colors to different elements of the file explorer:

- Inactive selection background
- Mouse hover background
- Tree indent guide lines
- Active selection background
- Focus background

## Development

### Project structure

```
folder-tree-colors/
├── src/
│   └── extension.ts      # Main extension code
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

### Available scripts

- `npm run compile` - Compiles TypeScript code
- `npm run watch` - Compiles in watch mode for development

## Contributing

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

MIT License - see the LICENSE file for details.

## Changelog

### 1.0.0
- Initial release
- Support for multiple color schemes
- Customizable settings
- Toggle and refresh commands
