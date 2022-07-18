import React from 'react';
import './style.scss';

const TitleComponent = (props) => {
    const { headerTitle, typeTitle = 'header', headerDescription, style } = props;

    return (
        <div className="title-container" style={style?.container}>
            {typeTitle === 'header' && (
                <h1 className="header-title" style={style?.header}>
                    {headerTitle}
                </h1>
            )}
            {typeTitle === 'sub-header' && (
                <p className="sub-header-title" style={style?.header}>
                    {headerTitle}
                </p>
            )}
            <p className="header-description" style={style?.description}>
                {headerDescription}
            </p>
        </div>
    );
};

export default TitleComponent;
