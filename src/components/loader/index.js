import './style.scss';

import loading from '../../assets/images/memphis.gif';

const Loader = () => {
    return (
        <div className="loader-container">
            <div></div>
            <img src={loading} alt="loading"></img>
        </div>
    );
};

export default Loader;
