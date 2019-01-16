// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { createTask } from '../saga/workers/createTask';

const action = tasksActions.createTask(__.task);

describe('createTask saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(createTask, action)
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.create, [__.task]),
                    __.fetchResponseSuccess
                ]
            ])
            .put(tasksActions.createTask(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(createTask, action)
            .put(uiActions.startFetching())
            .provide([
                [apply(api, api.tasks.create, [__.task]), __.fetchResponseFail]
            ])
            .put(uiActions.emitError(__.error.message, '→ createTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
