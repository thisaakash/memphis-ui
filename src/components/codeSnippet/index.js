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
        scrollbar: {
            // vertical: 'hidden',
            // scrollBeyondLastLine: false,
            // scrollPredominantAxis: false,
            // scrollBeyondLastLine: 1,
            // selectOnLineNumbers: false,
            // scrollBeyondLastColumn: false,
            verticalScrollbarSize: 3
            // selectionClipboard: true
            // selectOnLineNumbers: true
            // smoothScrolling: true
            // handleMouseWheel: false
        }
        // overviewRulerBorder: false
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
            <EditorCodeSnippet height="30vh" width="37vw" path={languageOption?.name} options={options} language={languageOption?.language} value={codeSnippet} />
            <ClickableImage className="clipboard-image" image={CopyClipboard} onClick={onCopy}></ClickableImage>
        </div>
    );
};

export default CodeSnippet;
