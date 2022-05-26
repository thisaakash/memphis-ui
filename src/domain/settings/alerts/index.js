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

import React, { useState } from 'react';

import Switcher from '../../../components/switcher';

const Alerts = () => {
    const [errorsAlert, setErrorsAlert] = useState(false);
    const [schemaAlert, setSchemaAlert] = useState(false);
    return (
        <div className="alerts-integrations-container">
            <h3 className="title">We will keep an eye on your data streams and alert you if anything went wrong according to the following triggers:</h3>
            <div>
                <div className="alert-integration-type">
                    <label className="alert-label-bold">Errors</label>
                    <Switcher onChange={() => setErrorsAlert(!errorsAlert)} checked={errorsAlert} checkedChildren="on" unCheckedChildren="off" />
                </div>
                <div className="alert-integration-type">
                    <label className="alert-label-bold">Schema has changed</label>
                    <Switcher onChange={() => setSchemaAlert(!schemaAlert)} checked={schemaAlert} checkedChildren="on" unCheckedChildren="off" />
                </div>
            </div>
        </div>
    );
};

export default Alerts;
