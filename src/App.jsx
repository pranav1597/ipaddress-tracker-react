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
  
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
 

    useEffect(function() {
      fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IP_ADDR_API_KEY}&ipAddress=192.212.174.101`)
      .then(res => res.json())
      .then(data => setAddr([data]))
    }, [])
  

    function getAddress(){
      fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_IP_ADDR_API_KEY}&${checkIpAddress.test(search) ? `ipAddress=${search}` : checkDomain.test(search) ? `domain=${search}` : "" }`)
      .then(res => res.json())
      .then(data => setAddr([data]))
    }
  

    function handleSubmit(e) {
      e.preventDefault()
      getAddress()
      setSearch('')
    }
    
    function onKeyEnter(){
      getAddress()
      setSearch('')
    }

// console.log('addr', addr)


  return (
    <div id='map' className='map'>
        <div className="ip-addr-header">
          <h1 className='ip-heading'>IP Address Tracker</h1>

          <div className="search-section">
            <input 
            type='text' 
            className='search-input'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter")
                  onKeyEnter();
              }}
            placeholder="Search for any IP address or domain"
            ></input>
            <button type='submit'
             onClick={handleSubmit} 
             className='search-btn'>
              <img src={iconArrow} alt='arrow icon' id='icon-arrow' >
                </img>
            </button>
          </div>



        <div className="ip-address-section">

          <div className="address-flex">
            <span className="address-flex-title">ip address</span>
              
            <span className="address-flex-show">{addr.map(add => <div key={add.ip}>{add.ip}</div>)}</span>
                  
            
          </div>
          
          <span className='line'></span>

          <div className="address-flex">
            <span className="address-flex-title">location</span>
            <span className="address-flex-show">{addr.map(add => <div key={add.ip}>{add.location.city}, {add.location.region}</div>)}</span>
          </div>

          <span className='line'></span>
          

          <div className="address-flex">
            <span className="address-flex-title">Timezone</span>
            <span className="address-flex-show">{addr.map(add => <div key={add.ip}>UTC {add.location.timezone}</div>)}</span>
          </div>

          
          <span className='line'></span>

          <div className="address-flex">
            <span className="address-flex-title">Isp</span>
            <span className="address-flex-show">{addr.map(add => <div key={add.ip}>{add.isp}</div>)}</span>
          </div>

        </div>


      </div>


      {/* map section */}
      <div className="map-section">
        {
          addr.map(add => {
            // console.log('add', [add.location.lat, add.location.lng] )
            return (

              <MapContainer key={add.ip} center={[add.location.lat ,add.location.lng]} zoom={13} >
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
