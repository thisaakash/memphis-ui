import React from 'react';
import ReactDOM from 'react-dom';
import axiosMock from 'axios';
import Users from '../domain/users';
jest.mock('axios');

// test('should fetch users', () => {
//     const users = [
//         {
//             id: '625d5bd746e1a32d70c519d2',
//             username: 'root',
//             user_type: 'root',
//             creation_date: '2022-04-18T12:38:47.034Z',
//             already_logged_in: true,
//             avatar_id: 3
//         },
//         {
//             id: '626520353f5b72285cc54bef',
//             username: 'avraham',
//             user_type: 'management',
//             creation_date: '2022-04-24T10:02:29.945Z',
//             already_logged_in: true,
//             avatar_id: 3
//         },
//         {
//             id: '62668e8a0990fa90a49f7bc3',
//             username: 'shay',
//             user_type: 'management',
//             creation_date: '2022-04-25T12:05:30.624Z',
//             already_logged_in: true,
//             avatar_id: 3
//         }
//     ];
//     const resp = { data: users };
//     axiosMock.get.mockResolvedValue(resp);

//     // or you could use the following depending on your use case:
//     // axios.get.mockImplementation(() => Promise.resolve(resp))

//     return Users.getAllUsers().then((data) => expect(data).toEqual(users));
// });

test('adds 1 + 2 to equal 3', () => {
    expect(Users.sum(1, 2)).toBe(3);
});
