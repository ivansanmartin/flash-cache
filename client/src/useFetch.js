import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = () => {
    const [dataFetch, setDataFetch] = useState({
        url: "",
        cache_name: "",
        use_redis: false,
        method: "",
        trigger: false
    })

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [responseServer, setReponse] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {

        if (dataFetch.url.length == 0 || dataFetch.cache_name.length == 0) return

        setLoading(true)
        axios.get(`http://localhost:3000/api/cache?api=${dataFetch.url}&cache_name=${dataFetch.cache_name}&caching=${dataFetch.use_redis}`)
            .then((response) => {
                if (!dataFetch.trigger) {
                    return
                }
                setReponse(response.data)

            })
            .finally(() => {
                setLoading(false)
                setSuccess(true)
                setDataFetch({...dataFetch, trigger: false})
            } )


    }, [dataFetch.url, dataFetch.cache_name,dataFetch.use_redis, dataFetch.trigger])


    return { setDataFetch, loading, success, responseServer }


}


export default useFetch;