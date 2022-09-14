import { useContext } from "react";
import { StepsContext } from "../../providers/Steps";

import { DoneWidget } from "./DoneWidget";
import { MenuWidget } from "./MenuWidget";
import { CartWidget } from "./OrderWidget";

const widgetSteps = [
  <MenuWidget key='menu' />,
  <CartWidget key='cart' />,
  <DoneWidget key='done' />,
];

const MainWidget = () => {
  const { step } = useContext(StepsContext);

  return widgetSteps[step];
};

export default MainWidget;
