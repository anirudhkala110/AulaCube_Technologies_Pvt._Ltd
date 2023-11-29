import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
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
    const [values, setValues] = useState([
        { title: "", description: '', priority: 0, completed: '' }
    ])
    // setValues({...values,completed:data.completed})
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.completed === 0 || data.completed === 1) {
            // axios.put(`http://localhost:5001/api/tasks/${taskid}/${completed}`, { ...values, description: values.description, title: values.title, priority: values.priority })
            axios.put(`http://localhost:5001/api/tasks/${taskid}`, { values: values, completed: data.completed })
                .then(res => {
                    console.log("Reached")
                    if (res.data.msg_type === "error") {
                        alert(res.data.msg)
                    }
                    else {
                        navigate('/')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            alert(data.completed)
        }

    }

    return (
        <div className='container'>
            {data ? <div className='row mt-5'>
                <center className='my-2 fs-2 fw-semibold'>Edit Page</center>
                <hr />
                <div className='col-6 mb-2 col-sm-12 col-xl-6 col-md-6 col-lg-6 card border-dark border'>
                    <center className='fs-3 fw-semibold'>Previous Data</center>
                    <hr />
                    <form>
                        <div className='form-group mb-4 p-2 shadow'>
                            <label className='form-label me-2 fs-6'>Title</label>
                            <input className='form-control fs-6' value={data.title} disabled />
                        </div>
                        <div className='form-group mb-4 p-2 shadow'>
                            <label className='form-label me-2 fs-6'>Description</label>
                            <textarea className='form-control fs-6' value={data.description} onResize={false} disabled />
                        </div>
                        <div className='form-group mb-4 p-2 shadow'>
                            <label className='form-label me-2 fs-6'>Priority</label>
                            <input className='form-control fs-6' value={data.priority === 1 ? 'High' : data.priority === 2 ? 'Medium' : 'Low'} disabled />
                        </div>
                        <div className='form-group mb-4 p-2 shadow'>
                            <label className='form-label me-2 fs-6'>Status</label>
                            <input className='form-control fs-6' value={data.completed === 0 ? 'Not Completed' : 'Completed'} disabled />
                        </div>
                    </form>
                </div>
                <div className='card border-dark border col-6 mb-2 col-sm-12 col-xl-6 col-md-6 col-lg-6'>
                    <center className='fs-3 fw-semibold'>Update New Data</center>
                    <hr />
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className='form-group mb-4 p-2 shadow'>
                            <label className='form-label me-2 fs-6'>Title</label>
                            <input className='form-control fs-6' placeholder={data.title} value={values.title} required onChange={e => setValues({ ...values, title: e.target.value })} />
                        </div>
                        <div className='form-group mb-4 p-2 shadow'>
                            <label className='form-label me-2 fs-6'>Description</label>
                            <textarea className='form-control fs-6' placeholder={data.description} required onResize={false} value={values.description} onChange={e => setValues({ ...values, description: e.target.value })} />
                        </div>
                        <div className='form-group mb-4 p-2 shadow'>
                            <div className='form-group'>
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
                            </div>
                        </div>
                        <button class="btn btn-outline-success" type='submit'>Submit</button>
                        <Link to='/' class="btn btn-outline-primary ms-3" type='submit'>Back to Home</Link>
                    </form>
                </div>
            </div> : <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center'>wait for loading the data</div>}
        </div>
    )
}

export default Edit