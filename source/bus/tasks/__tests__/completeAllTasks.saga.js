// Core
import { apply } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

// Instruments
import { api } from '../../../REST';
import { tasksActions } from '../actions';
import { uiActions } from '../../ui/actions';
import { completeAllTasks } from '../saga/workers/completeAllTasks';

const action = tasksActions.completeAllTasks(__.tasks);

describe('completeAllTasks saga:', () => {
    test('should complete a 200 status response scenario', async () => {
        await expectSaga(completeAllTasks, action)
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.completeAll, [__.tasks]),
                    __.fetchResponseSuccess
                ]
            ])
            .put(tasksActions.completeAllTasks(__.tasks))
            .put(uiActions.stopFetching())
            .run();
    });

    test('should complete a 400 status response scenario', async () => {
        await expectSaga(completeAllTasks, action)
            .put(uiActions.startFetching())
            .provide([
                [
                    apply(api, api.tasks.completeAll, [__.tasks]),
                    __.fetchResponseFail
                ]
            ])
            .put(
                uiActions.emitError(
                    __.error.message,
                    '→ completeAllTasks worker'
                )
            )
            .put(uiActions.stopFetching())
            .run();
    });
});
