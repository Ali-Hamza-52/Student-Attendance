import UpdateClass from '@/components/teacher/dashboard/class/UpdateClass'
import { getClassById } from '@/services/class/class'
import React from 'react'

const Page =async ({params}:{params:{id:string}}) => {
  const result = await getClassById(params.id)
  console.log("result: ",result.data)
  return (
    <UpdateClass id={params.id} data={result.data}/>
  )
}

export default Page
