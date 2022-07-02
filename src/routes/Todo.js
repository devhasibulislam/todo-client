import axios from 'axios';
import React from 'react';
import '../styles/todo.css';
import { useQuery } from 'react-query';

const Todo = () => {
    const handleTodoCreate = async (event) => {
        event.preventDefault();

        const todoTitle = event.target.title?.value;
        const todoDesc = event.target.desc?.value;

        const { data } = await axios.post('https://ta112-todo-app.herokuapp.com/todo', {
            title: todoTitle,
            desc: todoDesc,
            state: 'uncompleted'
        });

        refetch();
        console.log(data);
        event.target.reset();
    };

    const { data: todoLists, refetch } = useQuery('todoLists', () => fetch('https://ta112-todo-app.herokuapp.com/todo').then(res => res.json()));

    return (
        <React.Fragment>
            <section className='todo-grid'>
                <div>
                    <form onSubmit={handleTodoCreate}>
                        <div className='form-block'>
                            <input
                                type="text"
                                name="title"
                                className="todo-title"
                                placeholder='todo title'
                                required
                            />
                        </div>
                        <div className='form-block'>
                            <textarea
                                name="desc"
                                className="desc"
                                rows="3"
                                placeholder='todo description'
                                required
                            ></textarea>
                        </div>
                        <div className='form-block'>
                            <input type="submit" value="Add todo" className='todo-btn' />
                        </div>
                    </form>
                </div>
                <div>
                    <div>
                        <h3>Latest tasks</h3>
                        {
                            todoLists?.map(todoList => <p key={todoList._id}>{todoList.title}</p>)
                        }
                    </div>
                    <div>
                        <h3>Last completed tasks</h3>
                        {
                            todoLists?.map(todoList => {
                                if(todoList.state === 'completed'){
                                    return <p style={{textDecoration: "line-through"}}>{todoList.title}</p>
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Todo;
