import { useEffect, useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import EditorButton from './EditorButton';
import { TextBolder } from 'phosphor-icons';
import './TextEditor.scss';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
];

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  // { label: 'Quote', style: 'blockquote' },
  // { label: 'Code', style: 'code-block' },
  // { label: 'UL', style: 'unordered-list-item' },
  // { label: 'OL', style: 'ordered-list-item' },
];

const EditorButtons = ({ currentInlineStyle, onInline, onBlock }) => {
  return (
    <div className="editor__btn-container">
      {INLINE_STYLES.map((style) => (
        <EditorButton
          className={
            currentInlineStyle.has(style.style)
              ? 'editor__btn editor__btn--active'
              : 'editor__btn'
          }
          onClick={onInline.bind(null, style.style)}
          label={style.label}
          key={style.label}
        />
      ))}
      {BLOCK_TYPES.map((type) => (
        <EditorButton
          onClick={onBlock.bind(null, type.style)}
          label={type.label}
          key={type.label}
        />
      ))}
    </div>
  );
};

const TextEditor = ({ onSave, readOnly, task }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const readOnlyClasses = task.complete ? 'readonly--complete' : 'readonly';

  useEffect(() => {
    if (task.note) {
      const editorStateData = convertFromRaw(task.note);
      setEditorState(EditorState.createWithContent(editorStateData));
    }
  }, []);

  useEffect(() => {
    if (readOnly) return;
    const editorStateData = convertToRaw(editorState.getCurrentContent());
    onSave(editorStateData);
  }, [editorState]);

  const onChangeHandler = (editorState) => setEditorState(editorState);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChangeHandler(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) =>
    onChangeHandler(RichUtils.toggleInlineStyle(editorState, style));

  const toggleBlockType = (type) =>
    onChangeHandler(RichUtils.toggleBlockType(editorState, type));

  return (
    <div className={`editor ${readOnly ? readOnlyClasses : ''}`}>
      {!readOnly && (
        <EditorButtons
          currentInlineStyle={editorState.getCurrentInlineStyle()}
          onInline={toggleInlineStyle}
          onBlock={toggleBlockType}
        />
      )}
      <Editor
        editorState={editorState}
        onChange={onChangeHandler}
        handleKeyCommand={handleKeyCommand}
        readOnly={readOnly}
      />
    </div>
  );
};

export default TextEditor;
