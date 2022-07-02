import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import '../styles/completeTask.css';

const CompleteTasks = () => {
    const [id, setId] = useState('');
    const [completed, setCompleted] = useState(false);

    const { data: todoLists, isLoading, refetch } = useQuery('todoLists', () => fetch('https://todo-server-eight.vercel.app/todo').then(res => res.json()));

    const handleCompletion = async (id) => {
        const { data } = await axios.put(`https://todo-server-eight.vercel.app/todo/${id}`, { state: completed ? 'completed' : 'uncompleted' });
        
        refetch();
        setId('');
        console.log(data);
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <React.Fragment>
            <div className='complete-task-block'>
                <div>
                    {
                        todoLists?.map(todoList => {
                            if (todoList.state === 'completed') {
                                return <div className='complete-task-segment'>
                                    <input
                                        type="checkbox"
                                        checked={todoList.state === 'completed'}
                                        name="completed"
                                        onClick={() => {
                                            handleCompletion(todoList._id);
                                            setCompleted(!completed);
                                        }}
                                        style={{ width: "fit-content", marginRight: ".5rem" }}
                                    />
                                    <p key={todoList._id} onClick={() => setId(todoList._id)}>{todoList.title} {id !== '' && <span style={{ color: 'red' }}>*</span>}</p>
                                </div>
                            }
                        })
                    }
                </div>
                <div>
                    {
                        todoLists?.map(todoList => {
                            if (todoList._id === id) {
                                return <p>{todoList.desc}</p>
                            }
                        })
                    }
                    {id === '' && <p>No todo selected</p>}
                </div>
            </div>
        </React.Fragment>
    );
};

export default CompleteTasks;
