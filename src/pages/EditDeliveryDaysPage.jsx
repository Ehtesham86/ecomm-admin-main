import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import EditDeliveryDaysLayer from "../components/EditDeliveryDaysLayer";


const EditDeliveryDaysPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Edit Delivery Days" />

        {/* EditDeliveryDaysLayer */}
        <EditDeliveryDaysLayer />


      </MasterLayout>
    </>
  );
};

export default EditDeliveryDaysPage;
