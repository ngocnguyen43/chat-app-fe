import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import Button from '../components/atoms/Button'
import { setId } from '../store/socket-id-slide'
import { useNavigate } from 'react-router-dom'

export default function InputSocket() {
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.socketId)
    const navigate = useNavigate()
    const [userId, setUserId] = useState<string>("")
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(setId(userId))
        console.log(id)
        navigate("/test")
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">id</label>
            <input type="text" onChange={handleOnChange} />
            <Button>Submit</Button>
        </form>
    )
}
