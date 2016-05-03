export const validate = (values,props) => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } 
  if (!values.lastName) {
    errors.lastName = 'Required'
  } 
  else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }
  console.log(values)
  return errors
}

