// Copyright 2021-2022 The Memphis Authors
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';

import { getFontColor } from '../../utils/styleTemplates';

const AntTabs = withStyles({
    // root: {
    //     // borderBottom: '1px solid #e8e8e8'
    // },
    indicator: {
        backgroundColor: getFontColor('purple')
    }
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        fontSize: '14px',
        minWidth: 150,
        maxWidth: 170,
        fontWeight: 600,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        marginRight: theme.spacing(3),
        fontFamily: ['Inter'].join(','),
        '&:hover': {
            color: getFontColor('navy'),
            opacity: 1
        },
        '&$selected': {
            color: getFontColor('navy'),
            fontWeight: theme.typography.fontWeightBold
        },
        '&:focus': {
            color: getFontColor('navy')
        }
    },
    selected: {}
}))((props) => <Tab disableRipple {...props} />);

const CustomTabs = (props) => {
    const { tabs, onChange, value } = props;

    return (
        <div>
            <AntTabs value={value} onChange={onChange}>
                {tabs.map((tab, index) => (
                    <AntTab key={index} label={tab} />
                ))}
            </AntTabs>
        </div>
    );
};

export default CustomTabs;
