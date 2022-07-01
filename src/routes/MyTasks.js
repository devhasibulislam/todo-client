import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { FaPlus, FaMinus, FaTrash, FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import '../styles/myTask.css';
import axios from 'axios';

const MyTasks = () => {
    const [expand, setExpand] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [completed, setCompleted] = useState(false);

    const { data: todoLists, refetch } = useQuery('todoLists', () => fetch('http://localhost:5000/todo').then(res => res.json()));

    const handleDeleteTodo = async (id) => {
        const { data } = await axios.delete(`http://localhost:5000/todo/${id}`);
        refetch();
        setDeleteModal(false);
        console.log(data);
    };

    const handleUpdateTodo = async (id) => {
        const { data } = await axios.put(`http://localhost:5000/todo/${id}`, { title, desc });
        refetch();
        setUpdateModal(false);
        console.log(data);
    };

    const handleCompletion = async (id) => {
        const { data } = await axios.put(`http://localhost:5000/todo/${id}`, { state: completed ? 'completed' : 'uncompleted' });
        refetch();
        console.log(data);
    };

    return (
        <React.Fragment>
            <section className='my-task-block'>
                {
                    todoLists?.map(todoList => <div key={todoList._id}>
                        <div className='my-task-segment'>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <input type="checkbox" checked={todoList.state === 'completed'} name="completed" onClick={() => {
                                    handleCompletion(todoList._id);
                                    setCompleted(!completed);
                                }} />
                                {
                                    todoList.state === 'completed'
                                        ?
                                        <h4
                                            onClick={() => setExpand(!expand)}
                                            style={{
                                                whiteSpace: "nowrap",
                                                marginLeft: ".5rem",
                                                textDecoration: 'line-through'
                                            }}
                                        >{todoList.title}</h4>
                                        : <h4
                                            onClick={() => setExpand(!expand)}
                                            style={{
                                                whiteSpace: "nowrap",
                                                marginLeft: ".5rem"
                                            }}
                                        >{todoList.title}</h4>
                                }
                            </div>
                            <div>
                                <span>
                                    <button
                                        style={{ position: "relative", marginRight: ".5rem" }}
                                        onClick={() => setUpdateModal(true)}
                                        disabled={openUpdateModal}
                                    >
                                        <FaPen />
                                        {
                                            openUpdateModal
                                            &&
                                            <p
                                                style={{
                                                    backgroundColor: "white",
                                                    position: "absolute",
                                                    width: "10rem",
                                                    top: "100%",
                                                    right: "100%",
                                                    padding: ".2rem"
                                                }}
                                            >
                                                <span id='triangle'></span>
                                                <span
                                                    style={{ color: "black" }}
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder={todoList.title}
                                                        onChange={event => setTitle(event.target.value)}
                                                        required
                                                    />
                                                    <textarea
                                                        placeholder={todoList.desc}
                                                        onChange={event => setDesc(event.target.value)}
                                                        required
                                                    />
                                                </span>
                                                <span
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-evenly"
                                                    }}
                                                >
                                                    <button onClick={() => handleUpdateTodo(todoList._id)}><FaCheck /> Update</button>
                                                    <button onClick={() => setUpdateModal(false)}><FaTimes /> Cancel</button>
                                                </span>
                                            </p>
                                        }
                                    </button>
                                    <button
                                        style={{ position: "relative", marginRight: ".5rem" }}
                                        onClick={() => setDeleteModal(true)}
                                        disabled={openDeleteModal}>
                                        <FaTrash />
                                        {
                                            openDeleteModal
                                            &&
                                            <p
                                                style={{
                                                    backgroundColor: "white",
                                                    position: "absolute",
                                                    width: "10rem",
                                                    top: "100%",
                                                    right: "100%",
                                                    padding: ".2rem"
                                                }}
                                            >
                                                <span id='triangle'></span>
                                                <span
                                                    style={{ color: "black" }}
                                                >Are you sure?</span>
                                                <span
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-evenly"
                                                    }}
                                                >
                                                    <button onClick={() => handleDeleteTodo(todoList._id)}><FaCheck /> Confirm</button>
                                                    <button onClick={() => setDeleteModal(false)}><FaTimes /> Cancel</button>
                                                </span>
                                            </p>
                                        }
                                    </button>
                                </span>
                                <button onClick={() => setExpand(!expand)}>{expand ? <FaMinus /> : <FaPlus />}</button>
                            </div>
                        </div>
                        {expand && <p>{todoList.desc}</p>}
                    </div>)
                }
            </section>
        </React.Fragment>
    );
};

export default MyTasks;
