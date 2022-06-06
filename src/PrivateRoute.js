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

import React from 'react';
import {} from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

import AuthService from './services/auth';

function PrivateRoute(props) {
    const { component: Component, ...rest } = props;

    if (AuthService.isValidToken()) {
        return <Route {...rest} render={() => Component} />;
    } else {
        return <Redirect to={{ pathname: '/login', state: { referer: props.location } }} />;
    }
}

export default PrivateRoute;
