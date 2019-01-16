// Core
import { List, fromJS } from 'immutable';

// Reducer
import { tasksReducer } from '../reducer';

// Actions
import { tasksActions } from '../actions';

const initialState = List();

describe('tasks reducer:', () => {
    test('should return initial state by default', () => {
        expect(tasksReducer(void 0, {})).toEqual(initialState);
    });

    test('should handle FILL_TASKS action', () => {
        expect(tasksReducer(void 0, tasksActions.fillTasks(__.tasks))).toEqual(
            fromJS(__.tasks)
        );
    });

    test('should handle CREATE_TASK action', () => {
        expect(tasksReducer(void 0, tasksActions.createTask(__.task))).toEqual(
            fromJS([__.task])
        );
    });

    test('should handle REMOVE_TASK action', () => {
        expect(
            tasksReducer(fromJS(__.tasks), tasksActions.removeTask(__.task.id))
        ).toEqual(fromJS([__.task1, __.task2, __.task3]));
    });

    test('should handle UPDATE_TASK action', () => {
        const updatedTasks = fromJS([
            { ...__.task, completed: false },
            { ...__.task1 },
            { ...__.task2 },
            { ...__.task3 }
        ]);

        expect(
            tasksReducer(
                fromJS(__.tasks),
                tasksActions.updateTask([{ ...__.task, completed: false }])
            )
        ).toEqual(updatedTasks);
    });

    test('should handle COMPLETE_ALL_TASKS action', () => {
        expect(
            tasksReducer(void 0, tasksActions.completeAllTasks(__.tasks))
        ).toEqual(fromJS(__.tasks));
    });
});
