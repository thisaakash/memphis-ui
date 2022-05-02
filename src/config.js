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

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'DEV';
const SERVER_URL_PRODUCTION = `${window.location.href.split('//')[1].split('/')[0]}/api`;
const SSL_PREFIX = window.location.protocol == 'https:' ? 'https' : 'http';

export const SERVER_URL = environment === 'production' ? `${SSL_PREFIX}://${SERVER_URL_PRODUCTION}` : 'http://localhost:5555/api';
export const HANDLE_REFRESH_INTERVAL = 870000;
export const SHOWABLE_ERROR_STATUS_CODE = 666;
export const AUTHENTICATION_ERROR_STATUS_CODE = 401;
