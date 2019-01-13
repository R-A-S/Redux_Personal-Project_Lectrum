// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Instruments
import Styles from './styles.m.css';
import { sortTasksByGroup } from '../../instruments/helpers';

// Components
import Task from '../Task';
import Spinner from '../Spinner';
import Catcher from '../Catcher';
import Checkbox from '../../theme/assets/Checkbox';
import FlipMove from 'react-flip-move';
import {
    Control,
    Form,
    actions as formsActions
} from 'react-redux-form/lib/immutable';

// Actions
import { tasksActions } from '../../bus/tasks/actions';

const mapStateToProps = (state) => {
    return {
        tasks:      state.tasks,
        newMessage: state.forms.newTask.get('message'),
        filter:     state.forms.search.get('filterMessage'),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            ...bindActionCreators({ ...tasksActions }, dispatch),
            clearMessage: () => {
                dispatch(formsActions.change('forms.newTask.message', ''));
            },
        },
    };
};

@connect(
    mapStateToProps,
    mapDispatchToProps
)
export default class Scheduler extends Component {
    componentDidMount () {
        const { actions } = this.props;

        actions.fetchTasksAsync();
    }

    _createTask = () => {
        const {
            newMessage,
            actions: { createTaskAsync, clearMessage },
        } = this.props;

        if (newMessage.trim()) {
            createTaskAsync(newMessage);
            clearMessage();
        }
    };

    _completeAllTasks = () => {
        const { tasks, actions } = this.props;
        const allCompleted = tasks.every((task) => task.get('completed'));

        if (allCompleted) {
            return null;
        }
        const completedTasks = tasks.map((task) =>
            task.set('completed', 'true')
        );

        actions.completeAllTasks(completedTasks);
    };

    render () {
        const { actions, tasks, filter, newMessage } = this.props;

        const getAllCompleted = tasks.every((task) => task.get('completed'));

        const search = tasks.filter((task) =>
            task
                .get('message')
                .toLowerCase()
                .includes(filter.toLowerCase())
        );

        const list = sortTasksByGroup(filter ? search : tasks);
        const todoList = list.map((task) => (
            <Catcher key = { task.get('id') }>
                <Task
                    actions = { actions }
                    completed = { task.get('completed') }
                    favorite = { task.get('favorite') }
                    id = { task.get('id') }
                    message = { task.get('message') }
                    { ...task }
                />
            </Catcher>
        ));

        return (
            <section className = { Styles.scheduler }>
                <Spinner />
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <Control.text
                            model = 'forms.search.filterMessage'
                            placeholder = 'Поиск'
                            type = 'search'
                        />
                    </header>
                    <section>
                        <Form
                            noValidate
                            model = 'forms.newTask'
                            onSubmit = { this._createTask }>
                            <Control
                                required
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                model = 'forms.newTask.message'
                                placeholder = 'Описание моей новой задачи'
                                type = 'text'
                                value = { newMessage }
                            />
                            <button>Добавить задачу</button>
                        </Form>
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove
                                    duration = { 400 }
                                    easing = { 'ease' }
                                    enterAnimation = { {
                                        from: {
                                            transform: 'rotateX(90deg)',
                                            opacity:   0.5,
                                        },
                                        to: {
                                            transform: '',
                                        },
                                    } }
                                    leaveAnimation = { {
                                        from: {
                                            transform: '',
                                        },
                                        to: {
                                            transform: 'rotateX(-90deg)',
                                            opacity:   0.5,
                                        },
                                    } }
                                    staggerDelayBy = { 50 }>
                                    {todoList}
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            checked = { getAllCompleted }
                            color1 = '#363636'
                            color2 = '#fff'
                            onClick = { this._completeAllTasks }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
