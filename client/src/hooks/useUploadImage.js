import {useState} from 'react'
import axios from 'axios'

export const useUploadImage = ()=>{
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handlerChange=async(event)=>{
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e)=>{
            event.preventDefault()
            setLoading(true)
            axios.post('http://localhost:3001/images',{image:e.target.result})
            .then(res=>{
                setImage(res.data.image.url)
            }).catch(err=>{console.log(err);}).finally(()=>{setLoading(false)})
        }
        reader.readAsDataURL(file)
    }

    return {image, loading, handlerChange}
}
