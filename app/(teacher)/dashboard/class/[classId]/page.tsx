import Student from '@/components/teacher/dashboard/class/student/Student'
import React from 'react'

const Page =async ({params}:{params:{classId:string}}) => {
  return (
    <Student id={params.classId}/>
  )
}

export default Page
