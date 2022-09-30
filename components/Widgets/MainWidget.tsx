import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";

import { DoneWidget } from "./DoneWidget";
import { MenuWidget } from "./MenuWidget";
import { OrderWidget } from "./OrderWidget";

const widgetSteps = [
  <MenuWidget key='menu' />,
  <OrderWidget key='cart' />,
  <DoneWidget key='done' />,
];

const MainWidget = () => {
  const { step } = useContext(StepsContext);

  return widgetSteps[step];
};

export default MainWidget;
