// Instruments
import { MAIN_URL, TOKEN } from './config';

export const api = {
    tasks: {
        fetch () {
            return fetch(MAIN_URL, {
                method:  'GET',
                headers: {
                    authorization: TOKEN,
                },
            });
        },
        create (message) {
            return fetch(MAIN_URL, {
                method:  'POST',
                headers: {
                    authorization:  TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
        },
        update (task) {
            return fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    authorization:  TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify([task]),
            });
        },
        remove (id) {
            fetch(`${MAIN_URL}/${id}`, {
                method:  'DELETE',
                headers: {
                    authorization: TOKEN,
                },
            });
        },
        completeAll (tasks) {
            return fetch(MAIN_URL, {
                method:  'PUT',
                headers: {
                    authorization:  TOKEN,
                    'content-type': 'application/json',
                },
                body: JSON.stringify(tasks),
            });
        },
    },
};

// //!API from React
// export const api = {
//     //GET Read todos
//     //Get all or paginated todos.
//     async fetchTasks () {
//         const response = await fetch(MAIN_URL, {
//             method:  'GET',
//             headers: {
//                 authorization: TOKEN,
//             },
//         });

//         if (response.status !== 200) {
//             throw new Error('Todo\'s were not loaded.');
//         }

//         const { data: todos } = await response.json();

//         return todos;
//     },

//     //POST Create todo
//     //Create new todo.
//     async createTask (message) {
//         const response = await fetch(MAIN_URL, {
//             method:  'POST',
//             headers: {
//                 authorization:  TOKEN,
//                 'content-type': 'application/json',
//             },
//             body: JSON.stringify({ message }),
//         });

//         if (response.status !== 200) {
//             throw new Error('Task was not created.');
//         }

//         const { data: task } = await response.json();

//         return task;
//     },

//     //PUT Update todo Update todo text.
//     //Update completed field. Update favorite field.
//     async updateTask (task) {
//         const response = await fetch(MAIN_URL, {
//             method:  'PUT',
//             headers: {
//                 authorization:  TOKEN,
//                 'content-type': 'application/json',
//             },
//             body: JSON.stringify([task]),
//         });

//         if (response.status !== 200) {
//             throw new Error('Task was not updated.');
//         }

//         const {
//             data: [massage],
//         } = await response.json();

//         return massage;
//     },

//     //DELETE Delete todo
//     //DELETE {MAIN_URL}/{POST_ID}
//     async removeTask (id) {
//         const response = await fetch(`${MAIN_URL}/${id}`, {
//             method:  'DELETE',
//             headers: {
//                 authorization: TOKEN,
//             },
//         });

//         if (response.status !== 204) {
//             throw new Error('Task was not deleted.');
//         }
//     },

//     //PUT Update todo Update todo text.
//     //Update completed field. Update favorite field.
//     async completeAllTasks (tasks) {
//         const tasksFetch = tasks.map((task) => {
//             return fetch(MAIN_URL, {
//                 method:  'PUT',
//                 headers: {
//                     authorization:  TOKEN,
//                     'content-type': 'application/json',
//                 },
//                 body: JSON.stringify([task]),
//             });
//         });

//         await Promise.all(tasksFetch)
//             .then((resolve) => {
//                 resolve.forEach((response) => {
//                     if (response.status !== 200) {
//                         throw new Error('Task was not updated.');
//                     }
//                 });
//             })
//             .catch((error) => `async completeAllTasks : ${error.message}`);
//     },
// };
