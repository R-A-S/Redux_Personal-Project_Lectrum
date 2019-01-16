// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { fetchTasks } from '../saga/workers/fetchTasks';

describe('fetchTasks saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.fetch), __.fetchResponseSuccess]])
            .put(tasksActions.fillTasks(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(fetchTasks)
            .put(uiActions.startFetching())
            .provide([[apply(api, api.tasks.fetch), __.fetchResponseFail]])
            .put(uiActions.emitError(__.error.message, '→ fetchTasks worker'))
            .put(uiActions.stopFetching())
            .run();
    });
});
