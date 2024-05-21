// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('close-files-in-folder.closeFilesInFolder', async function (folder) {
			for (const document of vscode.workspace.textDocuments) {
				console.log(document.uri.fsPath);
				if (document.uri.fsPath.startsWith(folder.fsPath)) {
						await closeFileIfOpen(document);
				}
    	}
		});

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

async function closeFileIfOpen(textDocument) {
	const tabs = vscode.window.tabGroups.all.map(tg => tg.tabs).flat();
	for (const tab of tabs) {
		console.log(tab.input.constructor.name);
	}
	const index = tabs.findIndex(tab => tab.input instanceof vscode.TabInputText && tab.input.uri.path === textDocument.uri.fsPath);
	if (index !== -1) {
			await vscode.window.tabGroups.close(tabs[index]);
	}
}

module.exports = {
	activate,
	deactivate,
	closeFileIfOpen
}
