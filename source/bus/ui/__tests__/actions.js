// Actions
import { uiActions } from '../actions';

describe('ui actions:', () => {
    test('startFetching', () => {
        expect(uiActions.startFetching()).toMatchSnapshot();
    });

    test('stopFetching', () => {
        expect(uiActions.stopFetching()).toMatchSnapshot();
    });

    test('emitError', () => {
        expect(uiActions.emitError(__.error)).toMatchSnapshot();
    });

    test('emitError with meta', () => {
        expect(uiActions.emitError(__.error, __.meta)).toMatchSnapshot();
    });
});
