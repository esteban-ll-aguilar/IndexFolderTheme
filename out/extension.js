"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.FolderTreeColorProvider = void 0;
const vscode = require("vscode");
const COLOR_SCHEMES = {
    rainbow: [
        '#4ecdc4',
        '#45b7d1',
        '#96ceb4',
        '#ffeaa7',
        '#dda0dd',
        '#98d8c8',
        '#f7dc6f',
        '#bb8fce',
        '#85c1e9'
    ],
    'blue-tones': [
        '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5',
        '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1'
    ],
    'warm-tones': [
        '#fff3e0', '#ffe0b2', '#ffcc02', '#ffb74d', '#ffa726',
        '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100'
    ],
    'cool-tones': [
        '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a',
        '#009688', '#00897b', '#00796b', '#00695c', '#004d40'
    ],
    monochrome: [
        '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e',
        '#757575', '#616161', '#424242', '#303030', '#212121'
    ]
};
class FolderTreeColorProvider {
    constructor(context) {
        this.context = context;
        this.disposables = [];
        this.originalColorCustomizations = {};
        this.initialize();
    }
    initialize() {
        // Guardar las personalizaciones originales
        this.saveOriginalCustomizations();
        // Escuchar cambios en la configuración
        this.disposables.push(vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration('folderTreeColors')) {
                this.updateColors();
            }
        }));
        // Aplicar colores iniciales
        this.updateColors();
    }
    saveOriginalCustomizations() {
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        this.originalColorCustomizations = workbenchConfig.get('colorCustomizations') || {};
    }
    getConfiguration() {
        const config = vscode.workspace.getConfiguration('folderTreeColors');
        return {
            enabled: config.get('enabled', true),
            opacity: config.get('opacity', 0.8),
            colorScheme: config.get('colorScheme', 'rainbow')
        };
    }
    async updateColors() {
        const config = this.getConfiguration();
        if (!config.enabled) {
            await this.restoreOriginalColors();
            return;
        }
        const colors = COLOR_SCHEMES[config.colorScheme] || COLOR_SCHEMES.rainbow;
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        // Obtener las personalizaciones actuales sin modificar nada más
        const currentCustomizations = workbenchConfig.get('colorCustomizations') || {};
        // SOLO modificar las líneas de indentación del árbol
        // Crear una copia limpia que preserve TODOS los colores existentes
        const colorCustomizations = {
            ...currentCustomizations,
            // Solo las guías de indentación del árbol - estas son las líneas verticales
            "tree.indentGuidesStroke": colors[0]
        };
        await workbenchConfig.update('colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage('Colores de líneas de indentación actualizados');
    }
    async restoreOriginalColors() {
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        await workbenchConfig.update('colorCustomizations', this.originalColorCustomizations, vscode.ConfigurationTarget.Global);
    }
    async toggle() {
        const config = vscode.workspace.getConfiguration('folderTreeColors');
        const currentEnabled = config.get('enabled', true);
        await config.update('enabled', !currentEnabled, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Folder Tree Colors ${!currentEnabled ? 'habilitado' : 'deshabilitado'}`);
    }
    refreshColors() {
        this.updateColors();
        vscode.window.showInformationMessage('Colores de líneas actualizados');
    }
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.restoreOriginalColors();
    }
}
exports.FolderTreeColorProvider = FolderTreeColorProvider;
function activate(context) {
    console.log('Activando extensión Folder Tree Colors');
    const provider = new FolderTreeColorProvider(context);
    // Registrar comandos
    const toggleCommand = vscode.commands.registerCommand('folderTreeColors.toggle', () => {
        provider.toggle();
    });
    const refreshCommand = vscode.commands.registerCommand('folderTreeColors.refreshColors', () => {
        provider.refreshColors();
    });
    context.subscriptions.push(provider, toggleCommand, refreshCommand);
    vscode.window.showInformationMessage('¡Folder Tree Colors está activo! Solo se modificarán las líneas de indentación del explorador.');
}
exports.activate = activate;
function deactivate() {
    console.log('Desactivando extensión Folder Tree Colors');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map