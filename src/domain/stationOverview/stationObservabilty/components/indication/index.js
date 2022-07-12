// Copyright 2021-2022 The Memphis Authors
// Licensed under the GNU General Public License v3.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.gnu.org/licenses/gpl-3.0.en.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import './style.scss';
import React from 'react';
import TooltipComponent from '../../../../../components/tooltip/tooltip';
import { DeleteForeverRounded } from '@material-ui/icons';

const StatusIndication = ({ is_active, is_deleted }) => {
    if (is_active) {
        return (
            <TooltipComponent text="Live" minWidth="35px">
                <div className="circle-status active">
                    <div className="dot active-dot"></div>
                </div>
            </TooltipComponent>
        );
    } else if (!is_deleted) {
        return (
            <TooltipComponent text="Disconnected" minWidth="35px">
                <div className="circle-status disconnected">
                    <div className="dot disconnected-dot"></div>
                </div>
            </TooltipComponent>
        );
    } else {
        return <></>;
    }
};

export default StatusIndication;
