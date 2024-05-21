import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('close-files-in-folder.closeFilesInFolder', (folder) => {
		if (!folder && vscode.window.activeTextEditor) {
			const activeDocument = vscode.window.activeTextEditor.document.uri;
			const activeDocumentFolder = path.dirname(activeDocument.fsPath);
			folder = vscode.Uri.file(activeDocumentFolder);
		}
		if (!folder) {
			return;
		}
		for (const document of vscode.workspace.textDocuments) {
			if (document.uri.path.startsWith(folder.path)) {
				closeFileIfOpen(document.uri);
			}
		}
	});

	context.subscriptions.push(disposable);
}

export async function closeFileIfOpen(file:vscode.Uri) : Promise<void> {
    const tabs: vscode.Tab[] = vscode.window.tabGroups.all.map(tg => tg.tabs).flat();
    const index = tabs.findIndex(tab => tab.input instanceof vscode.TabInputText && tab.input.uri.path === file.path);
    if (index !== -1) {
        await vscode.window.tabGroups.close(tabs[index]);
    }
}
