import UpdateCourse from '@/components/teacher/dashboard/class/course/UpdateCourse'
import React from 'react'

const Page = ({params}:{params:{id:string}}) => {
  return (
    <UpdateCourse id={params.id} />
  )
}

export default Page
