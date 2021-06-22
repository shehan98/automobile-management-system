import React, {useContext} from 'react'
import VehiclesAPI from '../../../api/VehiclesAPI'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.CategoriesAPI.categories

    const [category, setCategory] = state.VehiclesAPI.category
    const [sort, setSort] = state.VehiclesAPI.sort
    const [search, setSearch] = state.VehiclesAPI.search

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <input type="text" value={search} placeholder="Search the Vehicle Model"
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row">
                <span>Filter: </span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value=''>All Vehicles</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }

                </select>
            </div>
            
            <div className="row">
                <span>Sort by: </span>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-manu_yr'>Year of Manufacture: High to Low</option>
                    <option value='sort=manu_yr'>Year of Manufacture: Low to High</option>
                    <option value='sort=-cylinder_cap'>Cylinder Capacity: High to Low</option>
                    <option value='sort=cylinder_cap'>Cylinder Capacity Low to High</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
