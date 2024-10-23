import React from 'react'
interface SectionWrapperProp {
  children: React.ReactNode;
}


const SectionWrapper: React.FC<SectionWrapperProp> = ({children}) => {
  return (
    <div className='max-w-7xl mx-auto px-5 md:px-10 py-2 md:py-5'>
      {
        children? children : <p>No content found</p>
      }
      
    </div>
  )
}

export default SectionWrapper
