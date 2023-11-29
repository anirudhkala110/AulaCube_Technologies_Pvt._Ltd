import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Read = () => {
    const { id } = useParams()
    const taskid = parseInt(id)
    const [data, setData] = useState()
    const [completed, setCompleted] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5001/api/read-task/${taskid}`)
            .then(res => {
                setData(res.data[0])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
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

    return (
        <div className='container d-flex align-items-start justify-content-center'>
            {data ?
                <div className='py-5 min-vh-100 w-100'>
                    <div className='container card shadow p-3' style={{ minWidth: "350px" }}>
                        <center className='fs-1 fw-semibold'>Reading Data</center>
                        <hr />
                        <div className=' fs-2 '>
                            <strong>Title</strong>{data.title}
                        </div>
                        <hr />
                        <div className=' fs-5'>
                            <strong>Description</strong><br /> {data.description}
                        </div>
                        <hr />
                        <div className=' '>
                            Priority:-- {data.priority === 1 ? 'High' : data.priority === 2 ? 'Medium' : 'Low'}
                        </div>
                        <hr />
                        <div className=''>
                            Status:-- {data.completed === 0 ? 'Not Completed' : 'Completed'}
                        </div>
                    </div>
                    <div className='my-2'>
                        <Link to={`/edit-task/${data.id}`} className='btn btn-outline-primary me-1'>Edit</Link>
                        <button className='btn btn-outline-danger ms-1' onClick={e => handleDelete(data.id)}>Delete</button>
                        <Link to='/' class="btn btn-outline-dark ms-3" type='submit'>Back to Home</Link>
                    </div>
                </div> : <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>Wait for loading the data</div>}
        </div>
    )
}

export default Read