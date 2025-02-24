import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DeliveryDaysListLayer from "../components/DeliveryDaysListLayer";




const DeliveryDaysListPage = () => {
  return (
    <>

      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Delivery Days List" />

        {/* DeliveryDaysListLayer */}
        <DeliveryDaysListLayer />

      </MasterLayout>

    </>
  );
};

export default DeliveryDaysListPage;
