import React from 'react'
import { useEffect,useState } from 'react';
import jwtFetch from '../../store/jwt';

const ChatGPTEvent = () => {
    // indoors, outdoors
    // active, chill 
    // How many people?
    const [setting, setSetting] = useState('')
    const [energy, setEnergy] = useState('')
    const [people, setPeople] = useState(0)
    const [eventOne, setEventOne] = useState("")
    const [eventTwo, setEventTwo] = useState("")
    const [eventThree, setEventThree] = useState("")


    const generateQuery = async () => {
        const response = await jwtFetch("/api/events/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ people: people, setting: setting, energy: energy })
        })
        
        const data = await response.json()
        return data.response.trim();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted")
        console.log(setting)
        console.log(energy)
        console.log(people)

        const query = await generateQuery();
        const eventArr = query.split(",");
        console.log(eventArr);
        setEventOne(eventArr[0]);
        setEventTwo(eventArr[1]);
        setEventThree(eventArr[2]);
    };
    

    return (
        <>
            <h1>Need ideas of what to do? We can help...</h1>
            <form className='event-form' onSubmit={handleSubmit}>
                <h3>Choose your setting</h3>
                <button type="button" onClick={() => setSetting("inside")}>Inside</button>
                <button type="button" onClick={() => setSetting("outside")}>Outside</button>
                <br />
                <br />



                <h3>What vibe are you going for?</h3>
                <button type="button" onClick={() => setEnergy("active")}>Active</button>
                <button type="button" onClick={() => setEnergy("chill")}>Chill</button>
                <br />
                <br />

                <h3>How many people are you thinking?</h3>
                <input 
                    type="text"
                    placeholder="#"
                    onChange={(e) => setPeople(e.target.value)}
                />
                <br />
                <br />

                <input 
                    type="submit"
                    value="Find Us Something To Do"
                />
            </form>
            <button>{eventOne}</button>
            <button>{eventTwo}</button>
            <button>{eventThree}</button>
        </>
    )
}

export default ChatGPTEvent