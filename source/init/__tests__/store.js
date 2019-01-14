// Core
import { createStore, combineReducers } from 'redux';

// Reducers
import { uiReducer as ui } from '../../bus/ui/reducer';
import { tasksReducer as tasks } from '../../bus/tasks/reducer';
import { formsReducer as forms } from '../../bus/forms/reducer';

// Store
import { store } from '../store';

const referenceRootReducer = combineReducers({
    ui,
    tasks,
    forms,
});

const referenceStore = createStore(referenceRootReducer);

describe('store:', () => {
    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
