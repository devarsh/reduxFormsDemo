import React,{Component} from 'react'
import {Field,reduxForm} from 'redux-form'

const validate = (values) => {
	
	values.person = {}
	const errors = {} 	
	errors.person = {}
	if(!values.person.firstName)
	{
		errors.person.firstName = 'Required Field'
	}
	if(!values.person.lastName)
	{
		errors.person.lastName = 'Required Field'
	}
	return errors
}

const sleep = (ms) => new Promise(res => setTimeout(res,ms))

const asyncValidate = (values) => 
	sleep(2000).then(()=> {
		const error = {}
		if(['paul','john','devil'].includes(values.person.firstName))
		{	
			error.person = {}
			error.person.firstName ='FirstName Taken'
		}
		if(['papa','akak','maka'].includes(values.person.lastName))
		{
			if(!error.person)
			{
				error.person = {}
			}
			error.person.lastName ='LastName Taken'
		}
		throw error
	})

const CustomComponent = ({name,placeholder,asyncValidating}) =>
<Field 
	name={`person.${name}`} 
	placeholder={placeholder} 
	component={field =>
		{
		
		return <div>
			<label htmlFor={`person.${name}`} >{name}</label>
			<input type="text" {...field} />
			{asyncValidating == `person.${name}`  && <span>Async Validation ...</span>}
			{field.touched && field.error && <span>{field.error}</span>}
		</div>}
		}
	/>

class LargeForm extends Component {
	constructor(props) {
		super(props)
		this.state = {components:[]} 
		this.counter=0
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}
	keyGenerator() {
		this.counter++;
		return `customeForm-${this.counter}`
	}
	componentDidMount() {
		let components = []
		components.push({name:'firstName',placeholder:'Enter First Name1'})
		components.push({name:'lastName',placeholder:'Enter Last Name'})
		this.setState({components})
	}
	handleChange(event) {
		this.setState({newElem:event.target.value})
	}
	handleClick(event) {
		let newComponents = this.state.components.slice()
		if(this.state.newElem)
		{
			newComponents.push({name:this.state.newElem,placeholder:''})
			this.setState({components:newComponents,newElem:''})
		}
	}
	handleKeyPress(event){
		if(event.which ==13) {
			this.handleClick()
		}
	}
	render() {
		const { asyncValidating,handleSubmit,pristine, reset, submitting} = this.props
		
		let components= this.state.components.slice()
		let newComponents = components.map(value => 
			<CustomComponent 
			name={value.name}
			placeholder={value.placeholder} 
			asyncValidating={asyncValidating} 
			/>)
		return (
		<div>
			<label>Add Element</label>
			<input type="text" value={this.state.newElem} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
			<button onClick={this.handleClick} >Add new Form Elem</button>
			<hr/>
			<form onSubmit={handleSubmit}>
				{newComponents}
				<button type="submit" disabled={submitting || pristine}>Submit</button>
		        <button type="button" disabled={submitting} onClick={reset}>Clear Values</button>
	        </form>
		</div>)
	}
}

export default reduxForm({
form :'SimpleForm',
validate,
//asyncValidate : asyncValidate,
//asyncBlurFields : ['person.firstName','person.lastName']
})(LargeForm)

