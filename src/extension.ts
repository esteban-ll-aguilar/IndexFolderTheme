import * as vscode from 'vscode';

interface ColorScheme {
    [key: string]: string[];
}

const COLOR_SCHEMES: ColorScheme = {
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

export class FolderTreeColorProvider {
    private disposables: vscode.Disposable[] = [];
    private originalColorCustomizations: any = {};

    constructor(private context: vscode.ExtensionContext) {
        this.initialize();
    }

    private initialize() {
    // Save the original customizations
        this.saveOriginalCustomizations();

    // Listen for configuration changes
        this.disposables.push(
            vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
                if (e.affectsConfiguration('folderTreeColors')) {
                    this.updateColors();
                }
            })
        );

    // Apply initial colors
        this.updateColors();
    }

    private saveOriginalCustomizations() {
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        this.originalColorCustomizations = workbenchConfig.get('colorCustomizations') || {};
    }

    private getConfiguration() {
        const config = vscode.workspace.getConfiguration('folderTreeColors');
        return {
            enabled: config.get<boolean>('enabled', true),
            opacity: config.get<number>('opacity', 0.8),
            colorScheme: config.get<string>('colorScheme', 'rainbow')
        };
    }

    private async updateColors() {
        const config = this.getConfiguration();
        
        if (!config.enabled) {
            await this.restoreOriginalColors();
            return;
        }

        const colors = COLOR_SCHEMES[config.colorScheme] || COLOR_SCHEMES.rainbow;
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        
    // Get current customizations without modifying anything else
        const currentCustomizations = workbenchConfig.get('colorCustomizations') || {};
        
    // ONLY modify the tree indent guide lines
    // Create a clean copy that preserves ALL existing colors
        const colorCustomizations: any = {
            ...currentCustomizations,
            
            // Only the tree indent guides - these are the vertical lines
            "tree.indentGuidesStroke": colors[0]
        };

        await workbenchConfig.update('colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Global);
        
    vscode.window.showInformationMessage('Indent guide colors updated');
    }

    private async restoreOriginalColors() {
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        await workbenchConfig.update('colorCustomizations', this.originalColorCustomizations, vscode.ConfigurationTarget.Global);
    }

    public async toggle() {
        const config = vscode.workspace.getConfiguration('folderTreeColors');
        const currentEnabled = config.get<boolean>('enabled', true);
        await config.update('enabled', !currentEnabled, vscode.ConfigurationTarget.Global);
        
        vscode.window.showInformationMessage(
            `Folder Tree Colors ${!currentEnabled ? 'enabled' : 'disabled'}`
        );
    }

    public refreshColors() {
        this.updateColors();
    vscode.window.showInformationMessage('Line colors updated');
    }

    public dispose() {
        this.disposables.forEach(d => d.dispose());
        this.restoreOriginalColors();
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating Folder Tree Colors extension');

    const provider = new FolderTreeColorProvider(context);

    // Registrar comandos
    const toggleCommand = vscode.commands.registerCommand('folderTreeColors.toggle', () => {
        provider.toggle();
    });

    const refreshCommand = vscode.commands.registerCommand('folderTreeColors.refreshColors', () => {
        provider.refreshColors();
    });

    context.subscriptions.push(
        provider,
        toggleCommand,
        refreshCommand
    );

    vscode.window.showInformationMessage('Folder Tree Colors is active! Only the explorer indent guide lines will be modified.');
}

export function deactivate() {
    console.log('Deactivating Folder Tree Colors extension');
}
