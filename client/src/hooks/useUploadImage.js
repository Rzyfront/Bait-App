import axios from 'axios';
import {useState}from 'react'

export const useUploadImage=()=>{
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)

    const handleChangeimage =(event)=>{
        const  file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e)=>{
            setLoading(true)
            axios.post('http://localhost:3001/images',{image:e.target.result})
            .then(res=>{
                setImage(res.data.image.url)
            }).catch(err=>{
                console.log(err);
            }).finally(()=>{
                setLoading(false)
            })
        }
        reader.readAsDataURL(file)
    }
    return {image,loading,handleChange}
}