import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddDeliveryDaysLayer from "../components/AddDeliveryDaysLayer";


const AddDeliveryDaysPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add Delivery Days" />

        {/* AddDeliveryDaysLayer */}
        <AddDeliveryDaysLayer />


      </MasterLayout>
    </>
  );
};

export default AddDeliveryDaysPage;
