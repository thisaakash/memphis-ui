import React, { useContext } from 'react';
import { Form } from 'antd';
import ReadyToroll from '../../../../assets/images/readyToRoll.svg';
import Button from '../../../../components/button';
import SlackIcon from '../../../../assets/images/slackIcon.svg';
import GithubIcon from '../../../../assets/images/githubIcon.svg';
import DiscordIcon from '../../../../assets/images/discordIcon.svg';
import { Link, useHistory } from 'react-router-dom';
import { GetStartedStoreContext } from '..';
import pathDomains from '../../../../router';
import './style.scss';

const Finsih = () => {
    const [creationForm] = Form.useForm();
    const history = useHistory();
    const [getStartedState, getStartedDispatch] = useContext(GetStartedStoreContext);

    const onFinish = (e) => {
        e.preventDefault();
        history.push(`${pathDomains.factoriesList}/${getStartedState.factoryName}/${getStartedState.stationName}`);
    };

    return (
        <Form name="form" form={creationForm} autoComplete="off">
            <div className="finish-container">
                <img className="image-finish" src={ReadyToroll} height="150px" width="150px" alt="ready-to-roll"></img>
                <p className="p-finish">You are ready to roll</p>
                <Button
                    className="go-to-station"
                    width="138px"
                    height="36px"
                    placeholder="Go to station"
                    colorType="purple"
                    radiusType="circle"
                    backgroundColorType="white"
                    fontSize="12px"
                    fontWeight="bold"
                    border="1px solid #EEEEEE"
                    borderRadius="31px"
                    onClick={(e) => {
                        onFinish(e);
                    }}
                />
                <p className="p-finish">Link to our channels</p>
                <div className="container-icons-finish">
                    <Link to={{ pathname: 'https://memphiscommunity.slack.com/archives/C03KRNC6R3Q' }} target="_blank">
                        <img src={SlackIcon} alt="slack-icon"></img>
                    </Link>
                    <Link to={{ pathname: 'https://github.com/memphisdev/memphis-broker' }} target="_blank">
                        <img src={GithubIcon} alt="github-icon"></img>
                    </Link>
                    <Link to={{ pathname: 'https://discord.com/invite/WZpysvAeTf' }} target="_blank">
                        <img src={DiscordIcon} alt="discord_icon"></img>
                    </Link>
                </div>
            </div>
        </Form>
    );
};

export default Finsih;
