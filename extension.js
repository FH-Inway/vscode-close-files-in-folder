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
						await vscode.window.showTextDocument(document, { preview: false });
						await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
				}
    	}
		});

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
