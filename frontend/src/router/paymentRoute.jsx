import { OrderComplete } from "../pages/Payment/OrderComplete.jsx";
import { Payment } from "../pages/Payment/Payment.jsx";
import PaymentApprove from "../pages/Payment/PaymentApprove.jsx";

export const paymentRoute = [
  {
    path: "/payment",
    element: <Payment />,
  },

  {
    path: "/payment/approve",
    element: <PaymentApprove />,
  },
  {
    path: "/order/complete/:orderId",
    element: <OrderComplete />,
  },
];
