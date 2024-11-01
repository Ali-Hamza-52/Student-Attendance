import React from 'react'
import AddStudent from './AddStudent'

const Student = ({id}:{id:string}) => {
  return (
    <AddStudent id={id}/>
  )
}

export default Student
