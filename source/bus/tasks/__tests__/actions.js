// Actions
import { tasksActions } from '../actions';

// Types
import { types } from '../types';

describe('tasks actions:', () => {
    test('fillTasks', () => {
        expect(tasksActions.fillTasks(__.tasks)).toEqual({
            type:    types.FILL_TASKS,
            payload: __.tasks,
        });
    });

    test('createTask', () => {
        expect(tasksActions.createTask(__.task)).toEqual({
            type:    types.CREATE_TASK,
            payload: __.task,
        });
    });

    test('updateTask', () => {
        expect(tasksActions.updateTask(__.task)).toEqual({
            type:    types.UPDATE_TASK,
            payload: __.task,
        });
    });

    test('removeTask', () => {
        expect(tasksActions.removeTask(__.task.id)).toEqual({
            type:    types.REMOVE_TASK,
            payload: __.task.id,
        });
    });

    test('completeAllTasks', () => {
        expect(tasksActions.completeAllTasks(__.tasks)).toEqual({
            type:    types.COMPLETE_ALL_TASKS,
            payload: __.tasks,
        });
    });

    test('fetchTasksAsync', () => {
        expect(tasksActions.fetchTasksAsync()).toEqual({
            type: types.FETCH_TASKS_ASYNC,
        });
    });

    test('createTaskAsync', () => {
        expect(tasksActions.createTaskAsync(__.task.message)).toEqual({
            type:    types.CREATE_TASK_ASYNC,
            payload: __.task.message,
        });
    });

    test('updateTaskAsync', () => {
        expect(tasksActions.updateTaskAsync(__.task)).toEqual({
            type:    types.UPDATE_TASK_ASYNC,
            payload: __.task,
        });
    });

    test('removeTaskAsync', () => {
        expect(tasksActions.removeTaskAsync(__.task.id)).toEqual({
            type:    types.REMOVE_TASK_ASYNC,
            payload: __.task.id,
        });
    });

    test('completeAllTasksAsync', () => {
        expect(tasksActions.completeAllTasksAsync(__.tasks)).toEqual({
            type:    types.COMPLETE_ALL_TASKS_ASYNC,
            payload: __.tasks,
        });
    });
});
