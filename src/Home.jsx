import { useState, useEffect } from "react"
import axios from "axios"
export default function Home() {
    const apikey = "eba89e6f2eaf450d807113556242607";
    const [locdata, setLocData] = useState({})
    const [current, setCurrent] = useState({condition:{}})
    const [forecastday, setForecastDay] = useState([{astro:{},day:{condition:{}},hour:[]}])
    

    const [query,setQuery]=useState("Amritsar")

    function handleSubmit(e){
      e.preventDefault();
        const url = "http://api.weatherapi.com/v1/forecast.json?key="+ apikey +"&q="+query+"&days=3&aqi=no&alerts=no";
        axios.get(url).then((res)=>{console.log(res.data); setLocData(res.data.location);
          setCurrent(res.data.current); setForecastDay(res.data.forecast.forecastday)
        })
    }
  return ( 
    <>
    <form className="w-50 m-auto mt-5">
            <div className="input-group">
                <input type="text" placeholder="search city" className="form-control" onChange={(e)=>setQuery(e.target.value)}/>
                <button className="btn btn-success" onClick={handleSubmit} >Search</button>
            </div>
        </form>
    <div className="bg-white m-5 p-5 rounded shadow">
    <div className="row">
      <div className="col-md-6">
      <p className="display-5">{locdata.name}, {locdata.region}, {locdata.country}</p>
      <p><em>{locdata.localtime} | lat : {locdata.lat}&deg; , lon : {locdata.lon}&deg;</em></p>
      <tr>
        <th><img height="150px" width="150px" src={current.condition.icon} className="m-3"></img></th>
        <th>
          <p height="150px" width="150px" className="display-1">{current.temp_c}&deg;C</p>
          <p><em>Feelslike : {current.feelslike_c}&deg;C | {current.condition.text}</em></p>
        </th>
      </tr>
      <br/>
      </div>
      
      <div className="col-md-6 text-justify text-md-left mt-5 ">
        <p><em>Humidity : {current.humidity}</em></p>
        <p><em>Wind : {current.wind_kph} km/h</em></p>
        <p><em>Visibility : {current.vis_km} km</em></p>
        <p><em>Pressure : {current.pressure_in}</em></p>
        <p><em>Dew point : {current.dewpoint_c}</em></p>
        <p><em>Pollen : {current.precip_in}</em></p>
      </div> 
    </div>
    <div className="mt-3">
    <p><em>3 - day forecast</em></p>
    <div className="row">
      {
        forecastday.map((fd)=>{
          return <div className="col-4">
            <p><em>{fd.date}</em></p>
            <div className="text-center">
              <img height="50px" width="50px" src={fd.day.condition.icon} ></img>
              <h4 className="mt-1">{fd.day.avgtemp_c}&deg;C</h4>
              <p><em>{fd.day.condition.text}</em></p>
            </div>
            <p><em>Humidity : {fd.day.avghumidity}</em></p>
            <p><em>Wind : {fd.day.maxwind_kph}</em></p>
            <p><em>Visibility : {fd.day.avgvis_km}</em></p>
            <div className="text-center">
                <p><em>clock wise forecast</em></p>
                <div className="row">
                  <div className="col-6 text-left">
                  <p><em>Time</em></p>
                  {
                    fd.hour.map((hr)=>{
                      return <p><em>{hr.time}</em></p>
                    }
                    )
                  }
                  </div>
                  <div className="col-6 text-right">
                  <p><em>Temprature</em></p>
                  {
                    fd.hour.map((tm)=>{
                      return <p><em>{tm.temp_c}</em></p>
                    }
                    )
                  }
                  </div>
                </div>
            </div>
            </div>
      
      }
    )
    }
    </div>
    
    </div>

    </div>
    </>
  )
}
