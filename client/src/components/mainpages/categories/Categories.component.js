import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import './categories.css'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setcallback] = state.CategoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            } else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setcallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            if(window.confirm('Are you sure you want to delete the selected category')){
                const res =await axios.delete(`/api/category/${id}`, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
                setcallback(!callback)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required 
                onChange={e => setCategory(e.target.value)}/>

                <button className="cat-create" type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    categories.map(category => (
                        <div className="row" key={category._id}>
                            <p>{category.name}</p>
                            <div>
                                <button className="cat-edit" onClick={() => editCategory(category._id, category.name)}>Edit</button>
                                <button className="cat-del" onClick={() => deleteCategory(category._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
