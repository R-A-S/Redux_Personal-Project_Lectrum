// Core
import React, { PureComponent } from 'react';
import cx from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Remove from '../../theme/assets/Remove';
import Edit from '../../theme/assets/Edit';
import Star from '../../theme/assets/Star';
import { Control } from 'react-redux-form/lib/immutable';

// Actions
import { tasksActions } from '../../bus/tasks/actions';
import { actions as formsActions } from 'react-redux-form/lib/immutable';

const mapStateToProps = (state, props) => {
    return {
        tasks:         state.tasks,
        edit:          state.forms.edit,
        isTaskEditing: state.forms.edit.get('editMessageId') === props.id,
        editedMessage: state.forms.edit.get('editedMessage'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ...bindActionCreators({ ...tasksActions }, dispatch),
            editTask: (message, id = null) => {
                dispatch(formsActions.change('forms.edit.editMessageId', id));
                dispatch(
                    formsActions.change('forms.edit.editedMessage', message)
                );
            },
        },
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Task extends PureComponent {
    _removeTask = () => {
        const { actions, id } = this.props;

        actions.removeTaskAsync(id);
    };
    _updateTask = (params) => {
        const { id, message, completed, favorite, actions } = this.props;
        const editedTask = { id, message, completed, favorite, ...params };

        actions.updateTaskAsync([editedTask]);
    };

    _updateTaskMessageOnClick = () => {
        const {
            id,
            message,
            isTaskEditing,
            actions: { editTask },
        } = this.props;

        if (isTaskEditing) {
            editTask(message);

            return null;
        }

        editTask(message, id);
    };

    _updateTaskMessageOnKeyDown = (e) => {
        const {
            message,
            editedMessage,
            actions: { editTask },
        } = this.props;

        if (e.key === 'Enter' && editedMessage.trim()) {
            this._updateTask({ message: editedMessage });
            editTask(editedMessage);
        }

        if (e.key === 'Escape') {
            editTask(message);
        }
    };

    _toggleTaskCompletedState = () => {
        this._updateTask({ completed: !this.props.completed });
    };

    _toggleTaskFavoriteState = () => {
        this._updateTask({ favorite: !this.props.favorite });
    };

    render () {
        const {
            message,
            completed,
            favorite,
            isTaskEditing,
            editedMessage,
        } = this.props;

        const styles = cx(Styles.task, {
            [Styles.completed]: completed,
        });

        return (
            <li className = { styles }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <Control.text
                        disabled = { !isTaskEditing }
                        getRef = { (node) => node && node.focus() }
                        maxLength = { 50 }
                        model = 'forms.edit.editedMessage'
                        value = { isTaskEditing ? editedMessage : message }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
