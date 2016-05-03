import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer,SubmissionError } from 'redux-form'
const SimpleForm = require('./VeryLargeForm.jsx').default

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})

const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)


const sleep = (ms) => new Promise(res => setTimeout(res,ms))
const  submitRes = values => 
  sleep(1000).then(() => {
    if(values.firstName === 'devarshmshah')
    {
      throw new SubmissionError({firstName : 'Just gonna say Taken'})
    }
    else
    {
      window.alert(`You d scsubmitted:\n\n${JSON.stringify(values, null, 2)}`) 
      Promise.resolve()
    }
  })


ReactDOM.render(
    <Provider store={store}>
    <div>
        <SimpleForm onSubmit={submitRes}/>
    </div>
    </Provider>,
    document.getElementById('example')
  )



