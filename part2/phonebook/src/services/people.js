import axios from 'axios'
const api = axios.create({
    baseURL:'http://localhost:3001/persons',
})

export const getData = ()=>api.get('').then(res=>res.data);
export const postData = (data)=>api.post('',data).then(res=>res.data);
export const updateData = (id, contact)=>api.put(`/${id}`,contact).then(res=>res.data);
export const deleteData = (id) =>api.delete(`/${id}`).then(res=>res.data);