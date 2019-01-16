/* Setup files module.
 **
 ** This module will be executed before each test.
 **
 ** This module contains a code to configure or set up the
 ** testing environment before each test. Since every test
 ** runs in its own environment, these scripts will be
 ** executed in the testing environment immediately before
 ** executing the test code itself.
 **
 ** This module executes before setupFramework module.
 **
 */

import { LocalStorage } from './mocks/localStorage';

const errorMessage = 'TEST_ERROR_MESSAGE.';
const successMessage = 'TEST_SUCCESS_MESSAGE';

const error = new Error(errorMessage);
const meta = 'TEST_META';

const task = {
    id:        '418994816351',
    message:   'message0',
    completed: true,
    favorite:  true,
};
const task1 = {
    id:        '19159649561',
    message:   'message1',
    completed: true,
    favorite:  false,
};

const task2 = {
    id:        '561415641654',
    message:   'message2',
    completed: false,
    favorite:  true,
};

const task3 = {
    id:        '489156153468',
    message:   'message3',
    completed: false,
    favorite:  false,
};

const tasks = [{ ...task }, { ...task1 }, { ...task2 }, { ...task3 }];

const responseDataSuccess = {
    data:    tasks,
    message: successMessage,
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseSuccess204 = {
    status: 204,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global.__ = {
    errorMessage,
    error,
    meta,
    task,
    task1,
    task2,
    task3,
    tasks,
    fetchResponseSuccess,
    fetchResponseFail,
    fetchResponseSuccess204,
};

global.localStorage = new LocalStorage();

global.__ENV__ = global.__DEV__ = process.env.NODE_ENV;
