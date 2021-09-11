
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	let disposable = vscode.commands.registerCommand('tie-selected-words.tie', function () {
		
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return; 
		}

		//getting the selected text
		let selectedText = editor.document.getText(editor.selection);

		// working with the string from here		
		let NBSPd = selectedText.replace(/ /g,"&nbsp;");

		let theNoSpan = `<span style="white-space:nowrap; display:inline-block; line-height:1.2em; mso-line-height-alt:0.6em">${NBSPd}</span>`

		editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, theNoSpan);
		});

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
