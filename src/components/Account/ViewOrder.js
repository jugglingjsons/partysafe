import React from "react";

const ViewOrder = ({ orderId, onHandleViewOrder }) => {
  return (
    <button
      className="action-button view-button"
      onClick={() => onHandleViewOrder(orderId)}
    >
      View Order
    </button>
  );
};

export default ViewOrder;
