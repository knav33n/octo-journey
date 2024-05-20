
import { FormEvent, useContext, useRef, useState } from "react"
import { Popup } from "react-map-gl"
import { AppContext } from "../layout/layout"
import axios from "../../config/axios"

interface Props {
    newPin: NewPin,
    setNewPin: (args: NewPin | null) => void,
}

export const NewPin = ({ newPin, setNewPin }: Props) => {
    const [app] = useContext(AppContext)!
    const [error, setError] = useState<string | null>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const ratingRef = useRef<HTMLSelectElement>(null)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!app?.currentUser) {
            setError("Please login to add pins!")
            return
        }

        const data = {
            ...newPin,
            title: titleRef.current?.value ?? "",
            desc: descRef.current?.value ?? "",
            rating: ratingRef.current?.value ?? "",
            username: app.currentUser
        }

        try {
            await axios.post("/v1/pins", data)
            // add to pins
            setNewPin(null)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Popup
            latitude={newPin.lat!}
            longitude={newPin.lng!}
            closeButton
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPin(null)}>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Title</label>
                <input placeholder='enter a title' ref={titleRef} />
                <label>Review</label>
                <textarea placeholder='say something about this place' ref={descRef}></textarea>
                <label>Rating</label>
                <select ref={ratingRef}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button className='submit-button' type='submit'>Add Pin</button>
                {error && <span className="error">{error}</span>}
            </form>
        </Popup>
    )
}