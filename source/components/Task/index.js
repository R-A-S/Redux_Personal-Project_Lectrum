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

// Actions
import { tasksActions } from '../../bus/tasks/actions';

const mapStateToProps = (state) => {
    return { tasks: state.tasks };
};

const mapDispatchToProps = (dispatch) => {
    return { actions: bindActionCreators({ ...tasksActions }, dispatch) };
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

    _updateTaskMessageOnKeyDown = () => {
        //!!!!!!!!!!!!!
    };

    __updateTaskMessageOnClick = () => {
        //!!!!!!!!!!!!!
    };

    _toggleTaskCompletedState = () => {
        this._updateTask({ completed: !this.props.completed });
    };

    _toggleTaskFavoriteState = () => {
        this._updateTask({ favorite: !this.props.favorite });
    };

    render () {
        const { message, completed, favorite } = this.props;

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
                    <input disabled type = 'text' value = { message } />
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
                        checked = { false }
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
