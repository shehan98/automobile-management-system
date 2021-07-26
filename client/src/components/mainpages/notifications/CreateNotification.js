// import React, { Component } from 'react';
// import axios from 'axios';

// export default class CreateNotification extends Component {
//     constructor(props) {
//         super(props);

//         this.onChangeCustomer = this.onChangeCustomer.bind(this);
//         this.onChangeTitle = this.onChangeTitle.bind(this);
//         this.onChangeMessage = this.onChangeMessage.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             customer:'',
//             title: '',
//             message: '',
//             documents: [],
//             customers: []
//         }
//     }

    
//     componentDidMount() {
//         axios.get('/user/all_infor')
//         .then(response => {
//             if (response.data.length > 0) {
//             this.setState({
//                 customers: response.data.map(users => users.email),
//                 customer: response.data[0].email
//             })
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         })

//     }
    

//     onChangeCustomer(e) {
//         this.setState({
//             customer: e.target.value
//         })
//     }

//     onChangeTitle(e) {
//         this.setState({
//         title: e.target.value
//         })
//     }

//     onChangeMessage(e) {
//         this.setState({
//         message: e.target.value
//         })
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const notification = {
//             customer: this.state.customer,
//             title: this.state.title,
//             message: this.state.message,
//             documents: this.state.documents
//         }

//         console.log(notification);

//         axios.post('http://localhost:5000/api/notification/create', notification)
//             .then(res => console.log(res.data));

//     }

//     handleUpload = async e =>{
//         e.preventDefault()
//         try {
//             const file = e.target.files[0]
//             let formData = new FormData()
//             formData.append('file', file)

//             const res = await axios.post('http://localhost:5000/api/uploadAll', formData, {
//                 headers: {'content-type': 'multipart/form-data'}
//             })

//             console.log(res.data)

//         } catch (err) {
//             alert(err.response.data.msg)
//         }
//     }


//     render() {
//         return (
//         <div>
//         <h3>Create New notification</h3>
//         <form onSubmit={this.onSubmit}>

//             <div className="form-group"> 
//             <label>Customer: </label>
//             <select ref="userInput"
//                 required
//                 className="form-control"
//                 value={this.state.customer}
//                 onChange={this.onChangeCustomer}>
//                 {
//                     this.state.customers.map(function(users) {
//                     return <option 
//                         key={users}
//                         value={users}>{users}
//                         </option>;
//                     })
//                 }
//             </select>
//             </div>
            
//             <div className="form-group"> 
//             <label>Title: </label>
//             <input  
//                 type="text"
//                 required
//                 className="form-control"
//                 value={this.state.title}
//                 onChange={this.onChangeTitle}
//                 />
//             </div>
//             <div className="form-group">
//             <label>Notification Message: </label>
//             <input 
//                 type="text" 
//                 required
//                 className="form-control"
//                 value={this.state.message}
//                 onChange={this.onChangeMessage}
//                 />
//             </div>
//             <div className="form-group">
//                 <input type="file" name="file" id="file_up" onChange={this.handleUpload}/>
//             </div>

//             <div className="form-group">
//             <input type="submit" value="Create Notification" className="btn btn-primary" />
//             </div>
//         </form>
//         </div>
//         )
//     }
// }

import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { GlobalState } from '../../../GlobalState';
import './notification.css'

const initialState = {
    title: '',
    message: '',
    customer:''
}

function CreateNotification() {
    const [notification, setNotification] = useState(initialState)
    const [document1, setDocument1] = useState(false)
    const [document2, setDocument2] = useState(false)
    const [document3, setDocument3] = useState(false)
    const [document4, setDocument4] = useState(false)
    const [document5, setDocument5] = useState(false)
    const state = useContext(GlobalState)
    const [customers] = state.UserAPI.customers

    // useEffect(() => {
    //     axios.get('/user/all_infor')
    //     .then(response => {
    //         if (response.data.length > 0) {
    //         this.setState({
    //             customers: response.data.map(users => users.email),
    //             customer: response.data[0].email
    //         })
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // })

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setNotification({...notification, [name]:value})
    }

    const handleUploadDoc1 = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:5000/api/uploadAll', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            setDocument1(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleUploadDoc2 = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:5000/api/uploadAll', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            setDocument2(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleUploadDoc3 = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:5000/api/uploadAll', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            setDocument3(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleUploadDoc4 = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:5000/api/uploadAll', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            setDocument4(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleUploadDoc5 = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:5000/api/uploadAll', formData, {
                headers: {'content-type': 'multipart/form-data'}
            })

            setDocument5(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        try {
            axios.post('http://localhost:5000/api/notification/create', {...notification, document1, document2, document3, document4, document5})

            setDocument1(false)
            setDocument2(false)
            setDocument3(false)
            setDocument4(false)
            setDocument5(false)
            setNotification(initialState)
            window.alert("Notification created successfully!")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="not-center-box">
        <h3 className="not-header">Create New notification</h3>

        <div className="form-group">
            <label className="not-label">Image I</label>
            <input type="file" name="file1" className="not-image-upload" onChange={handleUploadDoc1}/>
        </div>
        <div className="form-group">
            <label className="not-label">Image II</label>
            <input type="file" name="file2" className="not-image-upload" onChange={handleUploadDoc2}/>
        </div>
        <div className="form-group">
            <label className="not-label">Image III</label>
            <input type="file" name="file3" className="not-image-upload" onChange={handleUploadDoc3}/>
        </div>
        <div className="form-group">
            <label className="not-label">Image IV</label>
            <input type="file" name="file4" className="not-image-upload" onChange={handleUploadDoc4}/>
        </div>
        <div className="form-group">
            <label className="not-label">Documents (PDF)</label>
            <input type="file" name="file5" className="not-image-upload" onChange={handleUploadDoc5}/>
        </div>


        <form onSubmit={handleSubmit}>

            <div className="form-group"> 
            <label className="not-label">Customer </label>
            <select
                name="customer"
                className="form-control"
                value={notification.customer}
                onChange={handleChangeInput}
                >
                <option value="">Please select a customer</option>
                {
                    customers.map(customer => (
                        <option value={customer.email}>
                            {customer.email}
                        </option>
                    ))
                }
            </select>
            </div>
            
            <div className="form-group"> 
            <label className="not-label">Title: </label>
            <input  
                type="text"
                required
                className="form-control"
                name="title"
                value={notification.title}
                onChange={handleChangeInput}
                />
            </div>
            <div className="form-group">
            <label className="not-label">Notification Message </label>
            <textarea 
                rows="3" cols="50" 
                required
                className="form-control"
                name="message"
                value={notification.message}
                onChange={handleChangeInput}
                />
            </div>

            <div className="not-btn-create">
                <Button variant="contained" color="primary" type="submit">Create Notification</Button>
            </div>
        </form>

        </div>
        )
}

export default CreateNotification