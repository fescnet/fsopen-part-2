import React from 'react'

const Total = ({course}) => {
  const t = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return <b>total of {t} exercises</b>
}

export default Total
