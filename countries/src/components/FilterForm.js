import React from 'react'

const FilterForm = ({handleFilterChange, filter}) => (
  <div>
    find countries
    <input onChange={handleFilterChange} value={filter} />
  </div>
)

export default FilterForm
