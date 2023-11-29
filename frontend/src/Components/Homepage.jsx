import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/js/dist/modal';
import axios from 'axios';

const Homepage = () => {
    const [readData, setReadData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [addDataModal, setAddDataModal] = useState();
    const [values, setValues] = useState({ title: "", description: '', priority: 0, });
    const [serialNumber, setSerialNumber] = useState(1);

    const handleAdd = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/tasks', { ...values, id: values.id, description: values.description, title: values.title, priority: values.priority })
            .then(res => {
                console.log("Reached");
                if (res.data.msg_type === 'error')
                    alert(res.data.msg);
                else
                    window.location.reload(true);
            })
            .catch(err => {
                console.log(err);
            });
    }
    const handleCheckboxChange = async (taskId) => {
        const confirmed = window.confirm('Do you really want to mark this task as completed? You will not be able to change it again.');
        if (confirmed) {
            try {
                // Assuming you have an API endpoint to toggle the completion status
                const response = await axios.patch(`http://localhost:5001/api/tasks/${taskId}/complete`);
                console.log(response.data);

                window.location.reload(true)

            } catch (error) {
                console.error('Error updating task completion status:', error);
            }
        }
        else { window.location.reload(true) }
    };
    const handleDelete = async (taskId) => {
        const confirmed = window.confirm('Do you really want to Delete this task? You will not be able to recover it again.');
        if (confirmed) {
            try {
                // Assuming you have an API endpoint to toggle the completion status
                const response = await axios.delete(`http://localhost:5001/api/tasks/${taskId}`);
                console.log(response.data);

                window.location.reload(true)

            } catch (error) {
                console.error('Error updating task completion status:', error);
            }
        }
        else { window.location.reload(true) }
    };



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = readData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        console.log("Getting data from backend");
        axios.get('http://localhost:5001/api/tasks')
            .then(res => {
                console.log(res.data);
                setReadData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + '...';
        }
    };

    return (
        <div className='container'>
            <center className='fs-3 fw-semibold'>This is the Todo List App</center>
            <hr />
            <div className='mt-3'>
                <div className='w-100 container d-flex align-items-center justify-content-end'>
                    <button className='btn btn-success' data-bs-toggle="modal" href="#exampleModalToggle"><i class="bi bi-plus-lg me-2"></i>Add</button>
                </div>
                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">Add New Task</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={e => handleAdd(e)}>
                                    <div className='form-group'>
                                        <label className=''>Topic</label>
                                        <input className='form-control' required onChange={e => setValues({ ...values, title: e.target.value })} />
                                    </div>
                                    <div className='form-group'>
                                        <label className=''>Description</label>
                                        <textarea className='form-control' required onChange={e => setValues({ ...values, description: e.target.value })} />
                                    </div>
                                    <div className='form-group'>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            required
                                            value={values.priority}
                                            onChange={(e) => setValues({ ...values, priority: e.target.value })}
                                        >
                                            <option value={0} selected disabled>Select Priority</option>
                                            <option value={1}>High</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>Low</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-primary" type='submit'>Submit</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-2'>
                <table className='table table-striped'>
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Sr no.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((data, key) => (
                            <tr key={key}>
                                <td>{serialNumber + key}</td>
                                <td style={{ maxWidth: "75px" }}>{truncateText(data.title, 15)}</td>
                                <td style={{ maxWidth: "100px" }}>{truncateText(data.description, 15)}</td>
                                <td>{data.priority === 1 ? 'High' : data.priority === 2 ? 'Medium' : 'Low'}</td>
                                <td className=''>
                                    {data.completed === 0 ? <><input type='checkbox' onChange={(e) => handleCheckboxChange(data.id)} />Not Done</> : <><input type='checkbox' className='px-1 form-check-input d-flex align-items-center justify-content-center' id="flexCheckCheckedDisabled" value="Completed" checked disabled />Completed</>}
                                </td>
                                <td className='' style={{ maxWidth: "125px" }}>
                                    <Link to={`/edit-task/${data.id}`} className='btn btn-primary me-1'>Edit</Link>
                                    <Link to={`/read-task/${data.id}`} className='btn btn-info me-1'>Read</Link>
                                    <button className='btn btn-danger ms-1' onClick={e => handleDelete(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(readData.length / itemsPerPage) }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Homepage