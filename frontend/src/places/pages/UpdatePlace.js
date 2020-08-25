import React from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './PlaceForm.css';

const DUMMY_PLACES =[
    {
        id : 'p1',
        title: 'Tukai darshan hill',
        description : "One of the best hill",
        imageUrl :"https://source.unsplash.com/user/erondu/likes/1600x900",
        address : "Hadapsar Gaon, Hadapsar, Pune, Maharashtra 411028",
        location : {
            lat  : 18.511304, 
            lng : 73.922800
        },
        creator : "u1"
    },
    {
        id : 'p2',
        title: 'Tukai darshan hill',
        description : "One of the best hill",
        imageUrl :"https://source.unsplash.com/user/mike/likes/1600x900",
        address : "Hadapsar Gaon, Hadapsar, Pune, Maharashtra 411028",
        location : {
            lat  : 18.511304, 
            lng : 73.922800
        },
        creator : "u2"
    }
]


const UpdatePlace =() =>{
    const placeId = useParams().placeId;
    
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
   
    if(!identifiedPlace){
        return (
            <div className="center">
                <h2>Could not find place</h2>
            </div>
        )
    }
    return(
        <form className="place-form">
            <Input 
                id="title"
                element = "input"
                type = "text"
                label = "Title"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter valid title."
                onInput={()=>{}}
                value ={ identifiedPlace.title }
                valid={true}
            /> 
            <Input 
                id="title"
                element = "textarea"
                label = "Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description."
                onInput={()=>{}}
                value ={ identifiedPlace.description }
                valid={true}
            /> 
            <Button type="submit" disabled={true}>UPDATE PLACE</Button>
        </form>
    ) 
};

export default UpdatePlace
