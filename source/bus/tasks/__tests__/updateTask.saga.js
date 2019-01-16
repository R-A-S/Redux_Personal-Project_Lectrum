// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { updateTask } from '../saga/workers/updateTask';

const action = tasksActions.updateTask(__.task);

describe('updateTask saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(updateTask, action)
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.update, [__.task]),
                    __.fetchResponseSuccess
                ]
            ])
            .put(tasksActions.updateTask(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(updateTask, action)
            .put(uiActions.startFetching())
            .provide([
                [apply(api, api.tasks.update, [__.task]), __.fetchResponseFail]
            ])
            .put(uiActions.emitError(__.error.message, '→ updateTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
