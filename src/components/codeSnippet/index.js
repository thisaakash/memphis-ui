import React, { useContext, useEffect } from 'react';
import './style.scss';
import EditorCodeSnippet from '../editorCodeSnippet';
import CopyClipboard from '../../assets/images/copyClipboard.svg';
import ClickableImage from '../clickableImage';
import { GetStartedStoreContext } from '../../domain/overview/getStarted';

const CodeSnippet = (props) => {
    const { onCopyToClipBoard, languageOption, codeSnippet } = props;
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    const options = (EditorCodeSnippet.IStandaloneEditorConstructionOptions = {
        readOnly: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        selectionHighlight: true,
        renderLineHighlight: 'none',
        scrollbar: {
            verticalScrollbarSize: 3
            // horizontalScrollbarSize: 3
        }
    });

    const onCopy = () => {
        navigator.clipboard.writeText(codeSnippet);
        onCopyToClipBoard();
        getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: false });
    };

    useEffect(() => {
        getStartedDispatch({ type: 'SET_NEXT_DISABLE', payload: true });
    }, []);

    return (
        <div className="editor-code-snippet-container">
            <EditorCodeSnippet height="23vh" path={languageOption?.name} options={options} language={languageOption?.language} value={codeSnippet} />
            <ClickableImage className="clipboard-image" image={CopyClipboard} onClick={onCopy}></ClickableImage>
        </div>
    );
};

export default CodeSnippet;
