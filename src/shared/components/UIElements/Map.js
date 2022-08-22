import React, { useRef, useEffect } from 'react'

import './Map.css'

const Map = (props) => {
  const mapRef = useRef()

  const {center, zoom} = props

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    })

    new window.google.maps.Marker({position: center, map: map})
  }, [center, zoom])


  return <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
  </div>
}
// AIzaSyBo9CsPpkrKvYXzFURboNHc_KvzANsbJ_E
// AIzaSyAG-VYt8f8p-a4SMY0To7fBQJ4q0TJZePM - places
export default Map
