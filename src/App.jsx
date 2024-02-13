import React, { useEffect, useState } from 'react'
import './App.css'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import iconArrow from '../images/icon-arrow.svg'
import { MapContainer, TileLayer} from 'react-leaflet'
import MarkerPosition from './MarkerPosition'

function App() {



  const [addr, setAddr] = useState([]);
  const [search, setSearch] = useState("");
  
 

    useEffect(function() {
      fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IP_ADDR_API_KEY}&ipAddress=192.212.174.101`)
      .then(res => res.json())
      .then(data => setAddr([data]))
    }, [])
  

  // const position = [addr.location.lat, addr.location.lng]
  // useEffect(() => {
  //   map.flyTo(position, 13, {
  //     animate: true
  //   })
  // }, [map, position])

// console.log('addr', addr)
  

//   var map = L.map('map').setView([51.505, -0.09], 13);

//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

  return (
    <div id='map' className='map'>
        <div className="ip-addr-header">
          <h1 className='ip-heading'>IP Address Tracker</h1>

          <div className="search-section">
            <input 
            type='text' 
            className='search-input'
            
            placeholder="Search for any IP address or domain"
            ></input>
            <button type='submit'  className='search-btn'><img src={iconArrow} alt='arrow icon' id='icon-arrow' ></img></button>
          </div>



        <div className="ip-address-section">

          <div className="address-flex">
            <span className="address-flex-title">ip address</span>
              
            <span className="address-flex-show">{addr.map(add => <div>{add.ip}</div>)}</span>
                  
            
          </div>

          <div className="address-flex">
            <span className="address-flex-title">location</span>
            <span className="address-flex-show">{addr.map(add => <div>{add.location.city}, {add.location.region}</div>)}</span>
          </div>

          <div className="address-flex">
            <span className="address-flex-title">Timezone</span>
            <span className="address-flex-show">{addr.map(add => <div>UTC {add.location.timezone}</div>)}</span>
          </div>

          <div className="address-flex">
            <span className="address-flex-title">Isp</span>
            <span className="address-flex-show">{addr.map(add => <div>{add.isp}</div>)}</span>
          </div>

        </div>


      </div>


      {/* map section */}
      <div className="map-section">
        {
          addr.map(add => {
            return (

              <MapContainer center={[add.location.lat ,add.location.lng]} zoom={13} >
                 <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MarkerPosition addr={addr} />
              </MapContainer>
            )
          }
          )
        }

       
        {/* <ZoomControl className='zoom-control'></ZoomControl> */}
        
      </div>

            
    </div>
  )
}

export default App