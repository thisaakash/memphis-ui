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

export const convertDateToSeconds = (days, hours, minutes, seconds) => {
    let totalSeconds = 0;
    totalSeconds += days !== 0 ? days * 86400 : 0;
    totalSeconds += hours !== 0 ? hours * 3600 : 0;
    totalSeconds += minutes !== 0 ? minutes * 60 : 0;
    totalSeconds += seconds !== 0 ? seconds : 0;
    return totalSeconds;
};

export const convertSecondsToDate = (seconds) => {
    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let result = '';
    if (days > 0) {
        result = days === 1 ? 'one day' : `${days} days`;
        if (hours > 0) {
            result = hours === 1 ? `${result}, one hour` : `${result}, ${hours} hours`;
        }
        if (minutes > 0) {
            result = minutes === 1 ? `${result}, one minute` : `${result}, ${minutes} minutes`;
        }
        if (seconds > 0) {
            result = seconds === 1 ? `${result}, one second` : `${result}, ${seconds} seconds`;
        }
    } else if (hours > 0) {
        result = hours === 1 ? 'one hour' : `${hours} hours`;
        if (minutes > 0) {
            result = minutes === 1 ? `${result}, one minute` : `${result}, ${minutes} minutes`;
        }
        if (seconds > 0) {
            result = seconds === 1 ? `${result}, one second` : `${result}, ${seconds} seconds`;
        }
    } else if (minutes > 0) {
        result = minutes === 1 ? 'one minute' : `${minutes} minutes`;
        if (seconds > 0) {
            result = seconds === 1 ? `${result}, one second` : `${result}, ${seconds} seconds`;
        }
    } else if (seconds > 0) {
        result = seconds === 1 ? 'one second' : `${seconds} seconds`;
    }
    const spliter = result.split(',');
    for (let i = 0; i < spliter.length; i++) {
        if (i === 0) {
            result = spliter[0];
        } else if (i < spliter.length - 1) {
            result = `${result}, ${spliter[i]}`;
        } else {
            result = `${result} and ${spliter[i]}`;
        }
    }
    return result;
};
