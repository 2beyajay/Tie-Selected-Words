
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
	console.log("hey, this is working. The extension has been loaded.")

	let tie = vscode.commands.registerCommand('tie-selected-words.tie', function () {
		
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return; 
		}

		// Lorem, ipsum dolor sit amet
		// Lorem, ipsum <sup style="font-size: 9px; line-height: 0; vertical-align: 6px;">5</sup> dolor sit amet
		
		//getting the selected text
		let selectedText = editor.document.getText(editor.selection);

		// working with the string from here		
		let NBSPd = selectedText.replace(/ /g,"&nbsp;");

		let withNoWrap = `<span style="white-space:nowrap; display:inline-block; line-height:1.2em; mso-line-height-alt:0.6em">${NBSPd}</span>`

		editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, withNoWrap);
		});

	});
	
	let untie = vscode.commands.registerCommand('tie-selected-words.untie', function () {
		
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return; 
		}
		
		let selectedText = editor.document.getText(editor.selection);
		
		let spanRemoved = selectedText.replace(/<[^>]*>/g,"");
		let nbspRemoved = spanRemoved.replace(/&nbsp;/g," ");
		
		editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, nbspRemoved);
		});
		
	});
	
	context.subscriptions.push(tie);
	context.subscriptions.push(untie);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
