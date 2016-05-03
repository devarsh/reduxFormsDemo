import React from 'react'
import { Field, reduxForm } from 'redux-form'
var validate = require('./validation.js').default
const  { DOM: { input, select, textarea } } = React


const myCompoent = (group,...props) => 
  props.map(inputField => 
  <Field name={`${group}.${inputField}`} component={(props)=>
    <div>
    <label>{inputField}</label>
    <input {...props} />
    </div>} type="text" placeholder={`Enter ${inputField}`} />)

const collection = []

let counter = 0;

const add = (obj) =>
{
  collection.push(obj(counter+'st','firstname','lastname'))
  counter++;
}

add(myCompoent)
add(myCompoent)

const DeepForm = (props) => {
  const { asyncValidating,handleSubmit,pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      {collection}
      <button type="submit" disabled={pristine || submitting}>Submit</button>
    </form>

  )
}

 export default reduxForm({
  form: 'deep',  // a unique identifier for this form,
})(DeepForm)

 
