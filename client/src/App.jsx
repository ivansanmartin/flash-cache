import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './useFetch'
import { prettyPrintJson } from "pretty-print-json"

function App() {
  const [data, setData] = useState({
    api_url: "",
    cache_name: "",
    use_redis: false
  })

  const [empty, isEmpty] = useState(false)

  const { setDataFetch, loading, success, responseServer } = useFetch()
  const [jsonHtml, setHTML] = useState("")
  const [counter, setCounter] = useState(0)


  useEffect(() => {
    if (!loading && !success) {
      setHTML(`
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      
      `)
    } else {
      setCounter(counter + 1)
      console.log(responseServer)
      setHTML(prettyPrintJson.toHtml(responseServer))

    }


  }, [responseServer])

  return (
    <>
      <div className='wrapper d-flex justify-content-center align-items-center'>
        <div className='container-card text-break'>
            <div className='title d-flex w-100 justify-content-center mt-4'>
              <p className='fs-4 text-center'>Testing redis cache with API's</p>
            </div>
            <div className='api-test d-flex justify-content-center'>
              <div className='input-api'>
                <p className='text-center'>Input api URL which accept method GET for testing redis cache</p>
                <div className='inputs d-flex flex-column gap-5'>
                  <div className='d-flex justify-content-center align-items-center gap-2 flex-column'><label className='text-primary fw-bold' htmlFor='api-url'>[GET]</label><input className="input-text" id='api-url' placeholder='https://huachitos.cl/api/animales' name='api_url' onChange={e => setData({ ...data, [e.target.name]: e.target.value })}></input>
                  </div>
                  <div className='d-flex justify-content-center align-items-center gap-2 flex-column'><label className='text-primary fw-bold' htmlFor='cache-name'>Cache name</label><input className='input-text' placeholder='animals' name='cache_name' onChange={e => setData({ ...data, [e.target.name]: e.target.value })} id='cache-name' ></input></div>
                  <div className="switch d-flex justify-content-center align-items-center form-check form-switch gap-2">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name='use_redis' onClick={e => setData({...data, [e.target.name]: e.target.checked})} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Use Redis Cache</label>
                  </div>

                  {
                    empty &&
                    (
                      <div className='d-flex justify-content-center'><span className='text-danger'>Exists empty fields, please refill</span></div>
                    )
                  }
                  <div className='button-test d-flex justify-content-center'>
                    {
                         <button onClick={() => Object.keys(data).filter(e => e != "use_redis").map(e => data[e].length == 0 ? isEmpty(true) : setDataFetch({ url: data.api_url, cache_name: data.cache_name, use_redis: data.use_redis,method: "GET", trigger: true}), isEmpty(false))
                       }>{
                         loading ? (
                           <div className="spinner-border text-danger" role="status">
                               <span className="visually-hidden">Loading...</span>
                           </div>
                         )
                         :
                         (
                           "Test"
                         )
                       }</button>                      
                    }
                  </div>

                  {
                    success ? (
                      <div>
                        {
                          responseServer.before_caching && (
                            <p className='text-danger'><i className="fa-solid fa-triangle-exclamation text-warning"></i> First petition with this cache name after save data in cache of redis, please test again to view faster response</p>
                          )
                        }
                          <div className='d-flex justify-content-between'>
                            <p className={Number(responseServer.time_response.match(/\d+/g)[0]) < 1000 ? "text-success" : Number(responseServer.time_response.match(/\d+/g)[0]) < 1800 ? "text-warning" : "text-danger"}>Response time: {responseServer.time_response}</p>
                            <p className="text-success">Response counter: {counter}</p>
                          </div>
                          <div> 
                              <p className="text-primary">Data: </p>

                              <pre className='json-container' dangerouslySetInnerHTML={{__html: jsonHtml}}>
            
                              </pre>
                          </div>
                      </div>
                    )
                    :

                      undefined

                  }
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
