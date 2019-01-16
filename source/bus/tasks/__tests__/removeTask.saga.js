// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { removeTask } from '../saga/workers/removeTask';

const action = tasksActions.removeTask(__.task.id);

describe('removeTask saga:', () => {
    test('should complete a 204 status response scenario', async () => {
        await expectSaga(removeTask, action)
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.remove, [__.task.id]),
                    __.fetchResponseSuccess204
                ]
            ])
            .put(tasksActions.removeTask(__.task.id))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(removeTask, action)
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.remove, [__.task.id]),
                    __.fetchResponseFail
                ]
            ])
            .put(uiActions.emitError(__.error.message, '→ removeTask worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
