import React from "react"
import {Marker, Popup} from "react-leaflet"
import icon from './icon'

export default function MarkerPosition({addr}){
    console.log(addr)
    return(
        <>
    {addr.map(add => {
        return(

            <Marker className="mark" icon={icon} position={[add.location.lat,add.location.lng]}>
                <Popup>Hello world</Popup>
            </Marker>
        )
    })}
        </>
    )
}









