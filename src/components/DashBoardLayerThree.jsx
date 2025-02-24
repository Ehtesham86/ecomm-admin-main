import React from 'react';
import RecentOrdersOne from './child/RecentOrdersOne'
import UnitCountOne from './child/UnitCountOne'

const DashBoardLayerThree = () => {
  
  return (
    <section className="row gy-4">

      <UnitCountOne />

      {/* RecentOrdersOne */}
      <RecentOrdersOne />

    </section>


  )
}

export default DashBoardLayerThree