import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'
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
    const [isLoading, setIsLoading] = useState(false); 
    const placeId = useParams().placeId;

    
    const [formState, inputHandler, setFormData] = useForm({
        title  :{
            value : '', 
            isValid : false
        },
        description : {
            value: '',
            isValid: false
        }
    }, false)
    
    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    useEffect(()=>{
        if(identifiedPlace){
            setFormData({
                title  :{
                    value : identifiedPlace.title, 
                    isValid : true
                },
                description : {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
            setIsLoading(true)
        }
    }, [setFormData, identifiedPlace]);

    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState)
    }
    if(!identifiedPlace){
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place</h2>
                </Card>
            </div>
        )
    }

    if(!isLoading){
        return (
            <div className="center">
                <h2>Loading..</h2>
            </div>
        )
    }

    return(
        <form className="place-form" onSubmit={ placeUpdateSubmitHandler }>
            <Input 
                id="title"
                element = "input"
                type = "text"
                label = "Title"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Please enter valid title."
                onInput={inputHandler}
                initialValue ={ formState.inputs.title.value }
                valid={formState.inputs.title.isValid}
            /> 
            <Input 
                id="title"
                element = "textarea"
                label = "Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter valid description."
                onInput={inputHandler}
                initialValue ={ formState.inputs.description.value }
                valid={formState.inputs.description.isValid}
            /> 
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    ) 
};

export default UpdatePlace
