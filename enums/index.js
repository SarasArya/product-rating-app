module.exports = {
  PRODUCT_RATING: {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5
  },
  DELIVERY_STATUS: {
    SCHEDULED: {
      label: 'Scheduled for delivery',
      value: 'SCHEDULED'
    },
    IN_TRANSIT: {
      label: 'In transit',
      value: 'IN_TRANSIT'
    },
    DELIVERED: {
      label: 'Item Delivered',
      value: 'DELIVERED'
    },
    SCHEDULED_FOR_PICKUP: {
      label: 'Scheduled for pickup',
      value: 'SCHEDULED_FOR_PICKUP'
    },
    RETURNED: {
      label: 'Returned',
      value: 'RETURNED'
    },
    CANCELLED: {
      label: 'Cancelled',
      value: 'CANCELLED'
    }
  },
  PAYMENT_STATUS: {
    FAILED: 'FAILED',
    SUCCESSFUL: 'SUCCESSFUL',
    REFUNDED: 'REFUNDED'
  }
};
