import AddCourse from '@/components/teacher/dashboard/class/course/AddCourse'
import React from 'react'

const Page = ({params}:{params:{id:string}}) => {
  return (
    <AddCourse id={params.id} />
  )
}

export default Page
