# tie-selected-words README

Use a span tag with nonbreaking spaces around and between your selected words so they don't break in different screen sizes.

## Features
![tie](images/tie-selected-words.gif)


**Unsupported scenarios**
* If your selection spans multiple lines
* If you make multiple selections, only the last selection in the document will be treated.

## Keyboard shortcut binding
If you wish to make use of keyboard shortcuts to run the command, please go to |files -> preference -> keyboard shortcuts|, search for _“tie selected words”_ and add your own keyboard shortcut to it.

## Update OCT 2022
* Added the ability to reverse the tying of words. Select a no-wrap span created by the extension and run the _“untie-selected-words”_ command to untie it. Add your own keyboard shortcut for this command to make it quicker for you.
* Now your selection will ignore any html tags that might be in your selection.