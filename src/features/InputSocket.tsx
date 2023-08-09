import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/atoms/Button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setId } from '../store/socket-id-slide';
import { Storage } from '../service/LocalStorage';

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
        Storage.Set<string>("key", userId)
        console.log(id)
        navigate("/conversation")
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="test">id</label>
            <input id="test" type="text" onChange={handleOnChange} />
            <Button>Submit</Button>
        </form>
    )
}
