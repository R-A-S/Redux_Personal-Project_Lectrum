import { Map } from 'immutable';
import { combineForms } from 'react-redux-form/lib/immutable';

const newTask = Map({
    message: '',
});

const search = Map({
    filterMessage: '',
});

export const formsReducer = combineForms(
    {
        newTask,
        search,
    },
    'forms'
);
