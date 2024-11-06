import DetailedCourse from '@/components/teacher/dashboard/class/course/DetailedCourse'
import React from 'react'

const Page = ({params}:{params:{id:string}}) => {
  return (
    <DetailedCourse id={params.id} />
  )
}

export default Page
