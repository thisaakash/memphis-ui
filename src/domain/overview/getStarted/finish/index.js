import React from 'react';
import { Form } from 'antd';
import ReadyToroll from '../../../../assets/images/readyToRoll.svg';
import Button from '../../../../components/button';
import SlackIcon from '../../../../assets/images/slackIcon.svg';
import GithubIcon from '../../../../assets/images/githubIcon.svg';
import DiscordIcon from '../../../../assets/images/discordIcon.svg';
import { Link } from 'react-router-dom';

const Finsih = () => {
    const [creationForm] = Form.useForm();

    return (
        <Form name="form" form={creationForm} autoComplete="off" className="create-station-form-create-app-user">
            <img src={ReadyToroll} height="150px" width="150px" alt="ready-to-roll"></img>
            <p>You are ready to roll</p>
            <Button
                className="create-app-user"
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
                onClick={{}}
            />
            <p>Link to our channels</p>
            <div>
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
        </Form>
    );
};

export default Finsih;
