import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { AuthContext } from '../../shared/context/auth-context'

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("isLoginMode : ", isLoginMode)
    if(isLoginMode){
      
    }
    else{
      console.log('else')
      try{
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })
        const responseData = await response.json();
        setIsLoading(false)
        if(!response.ok){
          throw new Error(responseData.message);
        }
        console.log("responseData : ", responseData)
        auth.login()
      }
      catch(err){
        console.log(err)
        setIsLoading(false)
        setError(err.message || 'Something went wrong, Please try again')
      }
    }
  };

  const errorHandler = () =>{
    setError(null);
  }

  console.log("Error :: ", error)
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter name"
              onInput={inputHandler}
            />
          )}
          <Input
            elements="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid email address"
            onInput={inputHandler}
          />

          <Input
            elements="input"
            id="password"
            type="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? "Signup" : "Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};
export default Auth;
