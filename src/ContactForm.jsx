import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {validate} from './validation.js'
console.log(validate)
const  { DOM: { input, select, textarea } } = React

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(5000) // simulate server latency
    .then(() => {
      if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.firstName)) {
        throw { firstName: 'That username is taken' }
      }
    })
}


const SimpleForm = (props) => {
  const { asyncValidating,handleSubmit,pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component={firstName =>
            <div>
              <input type="text" {...firstName} placeholder="firstname"/>
              {asyncValidating === 'firstName' && <span>Async Validating</span> }
              {firstName.touched && firstName.error && <span>{firstName.error}</span>}
            </div>}/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field name="lastName" component={lastName =>
            <div>
              <input type="text" {...lastName} placeholder="lastname"/>
              {asyncValidating === '  ' && <span>Async Validating</span> }
              {lastName.touched && lastName.error && <span>{lastName.error}</span>}
            </div>}/>
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component={email =>
            <div>
              <input type="text" {...email} placeholder="Username"/>
              {email.touched && email.error && <span>{email.error}</span>}
            </div>}/>
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label><Field name="sex" component={input} type="radio" value="male" /> Male</label>
          <label><Field name="sex" component={input} type="radio" value="female"/> Female</label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component={select}>
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field name="employed" id="employed" component={input} type="checkbox"/>
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component={textarea}/>
        </div>
      </div>
      <div>
         <button type="submit" disabled={submitting || asyncValidating  }>Submit</button>
        <button type="button" disabled={submitting } onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

 export default reduxForm({
  form: 'myForm',  // a unique identifier for this form,
  validate : validate,
  asyncValidate,
  asyncBlurFields:['firstName','lastName']
})(SimpleForm)