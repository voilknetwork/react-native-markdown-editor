import { isStringWebLink, replaceBetween } from '@voilknetwork/react-native-markdown-editor/lib/src/utils';
import { 
  writeImageLinkHere,
  writeImageHereString
 } from '@voilknetwork/react-native-markdown-editor/lib/src/placeholderStrings';

export default ({ getState, item, setState }) => {
  const { selection, text } = getState();
  let newText;
  let newSelection;
  const selectedText = text.substring(selection.start, selection.end);
  if (selection.start !== selection.end) {
    if (isStringWebLink(selectedText)) {
      newText = replaceBetween(text, selection, `![${writeImageHereString}](${selectedText})`);
      newSelection = {
        start: selection.start + 2,
        end: selection.start + 2 + writeImageHereString.length,
      };
    } else {
      newText = replaceBetween(text, selection, `![${selectedText}](${writeImageLinkHere})`);
      newSelection = {
        start: selection.end + 3,
        end: selection.end + 3 + writeImageLinkHere.length,
      };
    }
  } else {
    newText = replaceBetween(text, selection, `![${writeImageHereString}](${writeImageLinkHere})`);
    newSelection = {
      start: selection.start + 2,
      end: selection.start + 2 + writeImageHereString.length,
    };
  }
  setState({ text: newText }, () => {
    setTimeout(() => {
      setState({ selection: newSelection });
    }, 25);
  });
};
