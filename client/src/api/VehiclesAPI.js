import React, {useState, useEffect} from 'react'
import axios from 'axios'

function VehiclesAPI() {
    const [vehicles, setVehicles] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)

    const getVehicles = async () => {
        const res = await axios.get(`/api/vehicles?limit=${page*9}&${category}&${sort}&model[regex]=${search}`)
        setVehicles(res.data.vehicles)
        setResult(res.data.result)
    }

    useEffect(() =>{
        getVehicles()
    },[callback, category, sort, search, page])

    return {
        vehicles: [vehicles, setVehicles],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
    }
}

export default VehiclesAPI
