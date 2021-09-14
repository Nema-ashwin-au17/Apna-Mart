import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import { useEffect } from 'react'
import { useRef, useState, useContext } from 'react'
import { useMemo, useCallback } from 'react'
import L from 'leaflet'
import { SetAddressContext, showmodalwithmessageandvariant } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
import { getuseraddress, setprofile } from '../../actions'
import { Alert } from 'react-bootstrap'
import { axiosinstance } from '../../config'
import './index.css'
import {NotificationModal} from '../Notification Modal'

function DisplayPosition({ map, markerref, circleref }) {
    const dispatch = useDispatch()

    const onMove = useCallback(() => {
        const newLatLng = new L.LatLng(map.getCenter().lat, map.getCenter().lng)

        if (markerref.current !== undefined && circleref.current !== undefined) {
            circleref.current.setLatLng(newLatLng)
            markerref.current.setLatLng(newLatLng)
        }
    }, [map, markerref, circleref])

    const onDragend = useCallback(() => {
        const { lat, lng } = map.getCenter()
        dispatch(getuseraddress(lat, lng))
    }, [map, dispatch])

    const onZoomend = useCallback(() => {
        const { lat, lng } = map.getCenter()
        dispatch(getuseraddress(lat, lng))
    }, [map, dispatch])

    useEffect(() => {
        map.on('move', onMove)
        map.on('dragend', onDragend)
        map.on('zoomend', onZoomend)

        return () => {
            map.off('move', onMove)
            map.off('dragend', onDragend)
            map.off('zoomend', onZoomend)
        }

    }, [map, onMove, onDragend, onZoomend])

    return (
        <>
        </>
    )
}

export default function LocationMap() {
    const dispatch = useDispatch()
    const [map, setMap] = useState(null)
    const mapismounted = useRef(false)
    const markerref = useRef()
    const circleref = useRef()
    const addresscontext = useContext(SetAddressContext)
    const { Name, Mobilenumber, Email, Location } = useSelector(state => state.Profile)
    const address = useSelector(state => state.Useraddress)
    const [modal, showmodal] = useState(false)
    const [modalvariant, changemodalvariant] = useState('warning')
    const modalmessage = useRef("")

    const displaymodaltouser = (message, variant) => {
        showmodalwithmessageandvariant(showmodal, message, undefined, variant, changemodalvariant, modalmessage)
    }

    useEffect(() => {
        if (address.length === 0 && addresscontext === undefined) {
            dispatch(getuseraddress(Location[0], Location[1]))
        }

        if (mapismounted.current === false && address.length === 1) {
            mapismounted.current = true
            dispatch(getuseraddress(Location[0], Location[1]))
        }

    }, [address, dispatch, Location, addresscontext])

    const findcurrentuserlocation = () => {
        navigator.permissions.query({ name: 'geolocation' })
            .then(
                ({ state }) => {
                    if (state === "denied") {
                        displaymodaltouser("You have to enable location access in the browser first in order to enable map to find your location", "danger")
                    }
                }
            ).catch(() => {
                displaymodaltouser("Sorry your current browser does not support location-tracking feature", "danger")
            }  )
        if (map !== undefined && map !== null) {
            try {
                map.locate()
                map.on('locationfound', (e) => {
                    map.flyTo(e.latlng, map.getZoom())
                })
            }
            catch (error) {
                displaymodaltouser("Sorry could not fetch your location. Please try again later", "danger")
                console.log("Error occurred")
            }
        }
    }


    const saveuserlocation = () => {
        if (map !== undefined && map !== null) {
            const { lat, lng } = map.getCenter()
            const data = {
                location: `${lat},${lng}`,
                Location: [lat, lng]
            }
            axiosinstance.put("/user/location", data).then((resp) => {
                if (resp.data.error !== "") {
                    displaymodaltouser(resp.data.error, "danger")
                    return
                }

                displaymodaltouser("Location saved", "warning")
                dispatch(setprofile({ Name, Email, Mobilenumber, Location: [lat, lng] }))

                if (addresscontext !== undefined && addresscontext !== null) {
                    addresscontext(false)
                }
            }).catch(() => {
                displaymodaltouser("Sorry your location could not be saved. Please try again later", "warning")
            })
        }
    }

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={Location}
                style={{ height: "40vh" }}
                zoom={16}
                scrollWheelZoom={true}
                whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker ref={markerref} position={Location} >

                </Marker>
                <Circle ref={circleref} center={Location} pathOptions={{ fillColor: 'blue' }} radius={200} />
            </MapContainer>
        ),
        [Location],
    )

    return (
        <div>
            <div className="leafletmap">
                <h3>Select your location</h3>
                <span className="text-info smalltext leafletend" onClick={findcurrentuserlocation} >Allow location access </span>
            </div>
            {map ? <DisplayPosition circleref={circleref} markerref={markerref} map={map} /> : null}
            {displayMap}

            <Alert variant={`${address[0] === 'Sorry we do not serve your area' ? 'danger' : 'warning'}`} >
                {
                    address.join(", ")
                }
            </Alert>
            <div className="d-flex justify-content-center">
                <button onClick={saveuserlocation} className={`mt-2 btn btn-info rounded-pill ${address[0] === 'Sorry we do not serve your area' ? 'disabled' : ''}`}>
                    Save Location
                </button>
            </div>
            <NotificationModal show={modal} centered={true} currentmodalmessage={modalmessage.current} onHide={showmodal} alertvariant={modalvariant} successmessage="Location saved" />
        </div>
    )
}