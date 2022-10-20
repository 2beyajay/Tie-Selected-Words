
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

// FUNCTION TO HANDLE STRING MANIPULATION AND RETURN
function handleTying (selection){
	const regex = /<.+?\/.*?>/g;

	const indexPairs = []; // saving starting and ending index of HTML tags
	let matchArr;

	// getting postion of matches
	while (null !== (matchArr = regex.exec(selection))) {
		indexPairs.push([matchArr.index, regex.lastIndex]);
	}

	let noHTML = selection.replace(regex, '') // stripping out the HTML tags from selection.

	let NBSPd = noHTML.replace(/\s/g,"&nbsp;"); // putting nbsps in place of white spaces

	let whatWillGoBack = { // saving information about what to put back and where in reference to NBSPd
		text: [],
		returningIndex: []
	};

	// using indexPairs to get information about what to put back and where in reference to NBSPd
	for (let i = 0; i < indexPairs.length; i++) {
		whatWillGoBack.text.push(selection.slice(indexPairs[i][0], indexPairs[i][1]))
		
		let numNbspOccurances = 0 // have to offset the positions by 5 every time whitespace was replaced with &nbsp;
		
		if (whatWillGoBack.returningIndex.length == 0) {
			numNbspOccurances = selection.slice(0, indexPairs[i][0]).match(/\s/g).length
			whatWillGoBack.returningIndex.push(indexPairs[i][0] + (numNbspOccurances*5))
		} else {
			numNbspOccurances = selection.slice(indexPairs[i-1][1], indexPairs[i][0]).match(/\s/g).length
			whatWillGoBack.returningIndex.push(indexPairs[i][0] + (numNbspOccurances*5))
		}
	}

	let htmlTagsReadded = '' // readding the stripped HTML tags at the appropriate position

	for (let i = 0; i < whatWillGoBack.returningIndex.length; i++) {
		
		if (htmlTagsReadded.length == 0) {
			htmlTagsReadded += NBSPd.slice(0,whatWillGoBack.returningIndex[i]) + whatWillGoBack.text[i]
		} else{
			htmlTagsReadded += NBSPd.slice(whatWillGoBack.returningIndex[i-1],whatWillGoBack.returningIndex[i]) + whatWillGoBack.text[i]
		}
		
	}

	// adding the final portion of the original selection
	htmlTagsReadded += selection.slice(indexPairs[indexPairs.length-1][1], (selection.length))

	let withNoWrap = `<span style="white-space:nowrap; display:inline-block; line-height:1.2em; mso-line-height-alt:0.6em">${htmlTagsReadded}</span>`

	return withNoWrap
}

function activate(context) {

	let tie = vscode.commands.registerCommand('tie-selected-words.tie', function () {
		
		// exiting if nothing is selected
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return; 
		}
		
		//getting the selected text
		let selectedText = editor.document.getText(editor.selection);

		editor.edit(editBuilder => {
			editBuilder.replace(editor.selection, handleTying(selectedText));
		});

	});
	
	let untie = vscode.commands.registerCommand('tie-selected-words.untie', function () {
		
		// exiting if nothing is selected
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
				return;
		}
		
		let selectedText = editor.document.getText(editor.selection);
		let htmlTagsRemoved = selectedText.replace(/<[^>]*>/g,"");
		let nbspRemoved = htmlTagsRemoved.replace(/&nbsp;/g," ");
		
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
