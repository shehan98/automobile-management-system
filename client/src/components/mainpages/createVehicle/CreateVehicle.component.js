import React, {useState, useContext, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import './createVehicle.css'
import Button from '@material-ui/core/Button';

const initialState = {
    vehicle_id: '',
    brand: '',
    model: '',
    color: '',
    grade: '',
    gear: '',
    manu_yr: '',
    origin_country: '',
    cylinder_cap: '',
    desc: '',
    _id:''
}


function CreateVehicle() {
    const state = useContext(GlobalState)
    const [vehicle, setVehicle] = useState(initialState)
    const [categories] = state.CategoriesAPI.categories
    const [images, setImages] = useState(false)

    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [vehicles] = state.VehiclesAPI.vehicles
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.VehiclesAPI.callback
    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            vehicles.forEach(vehicle => {
                if(vehicle._id === param.id){
                    setVehicle(vehicle)
                    setImages(vehicle.images)
                }
            })
        } else{
            setOnEdit(false)
            setVehicle(initialState)
            setImages(false)
        }
    }, [param.id, vehicles])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin){
                return alert("You are not an admin")
            }
            const file = e.target.files[0]
            if(!file){
                return alert("File not exist.")
            }
            if(file.size > 1920 * 1080){
                return alert("Size too large!")
            }
            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                return alert("File format is incorrect.")
            }

            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDelete = async () => {
        try {
            if(!isAdmin){
                return alert("You are not an admin")
            }
            await axios.post('/api/delete', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setVehicle({...vehicle, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin){
                return alert("you are not an admin")
            }
            if(!images){
                return alert("No image Upload")
            }
            
            if (onEdit) {
                await axios.put(`/api/vehicles/${vehicle._id}`, {...vehicle, images}, {
                    headers: {Authorization: token}
                })
            } else {
                await axios.post('/api/vehicles', {...vehicle, images}, {
                    headers: {Authorization: token}
                })
            }
            setImages(false)
            setVehicle(initialState)
            setCallback(!callback)
            history.push("/menu")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "bloack" : "none"
    }

    return (
        <div className="create_vehicle">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ''} alt="" />
                    <span onClick={handleDelete}>X</span>
                </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
            <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={vehicle.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="row">
                    <label htmlFor="vehicle_id">Vehicle ID</label>
                    <input type="text" name="vehicle_id" required
                    value={vehicle.vehicle_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="brand">Brand</label>
                    <input type="text" name="brand" required
                    value={vehicle.brand} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="model">Model</label>
                    <input type="text" name="model" required
                    value={vehicle.model} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="color">Color</label>
                    <input type="text" name="color" required
                    value={vehicle.color} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="grade">Grade</label>
                    <input type="text" name="grade" required
                    value={vehicle.grade} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="gear">Transmission</label>
                    <input type="text" name="gear" required
                    value={vehicle.gear} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="manu_yr">Year of Manufacture</label>
                    <input type="number" name="manu_yr" required
                    value={vehicle.manu_yr} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="origin_country">Country of Origin</label>
                    <input type="text" name="origin_country" required
                    value={vehicle.origin_country} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="cylinder_cap">Engine Capacity</label>
                    <input type="number" name="cylinder_cap" required
                    value={vehicle.cylinder_cap} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="desc">Description</label>
                    <textarea type="text" name="desc" required
                    value={vehicle.desc} rows="7" onChange={handleChangeInput} />
                </div>

                <Button variant="contained" color="primary" className="vehi-btn" type="submit">{onEdit? "Update" : "Create"}</Button>
            </form>
        </div>
    )
}

export default CreateVehicle
