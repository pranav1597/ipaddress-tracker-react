import React, { useEffect } from "react"
import {Marker, Popup, useMap} from "react-leaflet"
import icon from './icon'
import { point } from "leaflet"

export default function MarkerPosition({addr}){
    // console.log(addr.map(a => a.location.lat))

    const position = addr.map(a => [a.location.lat, a.location.lng])
    // const lng = addr.map(a => a.location.lng)


    // const position = [lat, lng]

    // console.log('pos',position[0])
    const map = useMap()

  useEffect(() => {
    map.flyTo(position[0], 14, {
      animate: true
    })
  }, [map, position[0]])

    return(
        <>
    {addr.map(add => {
        return(

            <Marker className="mark" icon={icon} position={position[0]} key={add.as.asn}>
                <Popup offset={point(15, 35)}>{add.location.city}, {add.location.country}</Popup>
            </Marker>
        )
    })}
        </>
    )
}









