import { Star } from "@mui/icons-material";
import RoomIcon from '@mui/icons-material/Room';
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useContext, useEffect, useState } from "react";
import { Map, Marker, Popup } from "react-map-gl";
import { format } from "timeago.js";
import { AppContext } from "../layout/layout";
import { NewPin } from "../new-pin/new-pin";

export const Home = () => {
    const appCtx = useContext(AppContext)
    const [app] = appCtx!
    const [pins, setPins] = useState<Pin[] | []>([])
    const [currentPlace, setCurrentPlace] = useState<string | null>(null)
    const [newPin, setNewPin] = useState<NewPin | null>(null)
    const [viewport, setViewport] = useState({
        longitude: 77.5906,
        latitude: 12.9796,
        zoom: 15
    })

    const handleMarkerClick = (id: string, lat: number, lng: number) => {
        setCurrentPlace(id)
        setViewport({
            longitude: lng,
            latitude: lat,
            zoom: 15
        })
    }

    useEffect(() => {
        const getPins = async () => {
            try {
                const { data } = await axios.get("/v1/pins")
                setPins(data)
            } catch (error) {
                console.log(error)
            }
        }
        getPins()
    }, [])

    const handleAddClick = (e: mapboxgl.MapLayerMouseEvent) => {
        const { lng, lat } = e.lngLat
        setNewPin({
            lat,
            lng
        })
    }

    return (
        <Map
            {...viewport}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX}
            onMove={e => setViewport(e.viewState)}
            style={{ width: '100vw', height: '100vh' }}
            mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
            onDblClick={(e) => handleAddClick(e)}
        >
            {pins?.map(pin => <Marker
                key={pin._id}
                longitude={pin.lng}
                latitude={pin.lat}
                pitchAlignment='viewport'
            >
                <RoomIcon
                    style={{
                        fontSize: viewport.zoom * 3,
                        color: pin.username === app.currentUser ? "tomato" : "slateblue",
                        cursor: "pointer"

                    }}
                    onClick={() => handleMarkerClick(pin._id, pin.lat, pin.lng)}
                />
                {pin._id === currentPlace && <Popup
                    longitude={pin.lng}
                    latitude={pin.lat}
                    closeButton
                    closeOnClick={false}
                    anchor="left"
                    onClose={() => setCurrentPlace(null)}
                >
                    <div className='card'>
                        <label>Place</label>
                        <h4>{pin.title}</h4>

                        <label>Review</label>
                        <p className='desc'>{pin.desc}</p>

                        <label>Rating</label>
                        <div className='stars'>
                            {Array(pin.rating).fill(<Star className='star' />)}
                        </div>

                        <label>Information</label>
                        <span className='username'>Created by <b>{pin.username}</b></span>
                        <span className='date'>{format(pin.createdAt)}</span>

                    </div>
                </Popup>}
                {newPin && <NewPin newPin={newPin} setNewPin={setNewPin} />}
            </Marker>)}
        </Map>
    )
}
