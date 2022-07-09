import React from 'react';
import './style.scss';
import EditorCodeSnippet from '../editorCodeSnippet';
import CopyClipboard from '../../assets/images/copyClipboard.svg';
import ClickableImage from '../clickableImage';

const CodeSnippet = (props) => {
    const { onCopyToClipBoard, languageOption, codeSnippet } = props;

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
    };

    return (
        <div
            style={{
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                border: '1px solid #D8D8D8',
                borderRadius: '4px'
                // boxSizing: 'border-box'
            }}
        >
            <EditorCodeSnippet
                height="30vh"
                // height="100%"
                width="49vh"
                path={languageOption?.name}
                options={options}
                language={languageOption?.language}
                value={codeSnippet}
            />
            <ClickableImage image={CopyClipboard} onClick={onCopy}></ClickableImage>
        </div>
    );
};

export default CodeSnippet;
