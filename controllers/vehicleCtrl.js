const Vehicles = require('../models/vehicleModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))


        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)


        //    gte = greater than or equal
        //    lte = lesser than or equal
        //    lt = lesser than
        //    gt = greater than
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const vehicleCtrl = {
    getVehicles: async(req, res) =>{
        try {
            const features = new APIfeatures(Vehicles.find(), req.query)
            .filtering().sorting().paginating()

            const vehicles = await features.query

            res.json({
                status: 'success',
                result: vehicles.length,
                vehicles: vehicles
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createVehicle: async(req, res) =>{
        try {
            const {vehicle_id, category, brand, model, color, grade, gear, manu_yr, origin_country, cylinder_cap, desc, images} = req.body;
            if(!images){
                return res.status(400).json({msg: 'No image upload'})
            }

            const vehicle = await Vehicles.findOne({vehicle_id})
            if(vehicle){
                return res.status(400).json({msg: 'This vehicle already exists.'})
            }

            const newVehicle = new Vehicles({
                vehicle_id, category, brand, model, color, grade, gear, manu_yr, origin_country, cylinder_cap, desc, images
            })

            await newVehicle.save()
            res.json({msg: "Created a vehicle"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteVehicle: async(req, res) =>{
        try {
            await Vehicles.findByIdAndDelete(req.params.id)
            res.json({msg: 'Deleted a Vehicle'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateVehicle: async(req, res) =>{
        try {
            const {category, brand, model, color, grade, gear, manu_yr, origin_country, cylinder_cap, desc, images} = req.body;
            if(!images){
                return res.status(400).json({msg: 'No image upload'})
            }

            await Vehicles.findOneAndUpdate({_id: req.params.id}, {
                category, brand, model, color, grade, gear, manu_yr, origin_country, cylinder_cap, desc, images
            })

            res.json({msg: "updated a Vehicle"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = vehicleCtrl