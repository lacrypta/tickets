import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";

import { MenuWidget } from "./MenuWidget";
import { OrderWidget } from "./OrderWidget";
import { PaymentMethodsWidget } from "./PaymentMethodsWidget";

const widgetSteps = [
  <MenuWidget key='menu' />,
  <OrderWidget key='cart' />,
  <PaymentMethodsWidget key='paymentMethod' />,
];

const MainWidget = () => {
  const { step } = useContext(StepsContext);

  return widgetSteps[step];
};

export default MainWidget;
