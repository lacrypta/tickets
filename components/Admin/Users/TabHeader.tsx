import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface TabsHeaderProps {
  title: string;
}

const TabHeader = ({ title }: TabsHeaderProps) => {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
          selected
            ? "bg-white shadow"
            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
        )
      }
    >
      {title}
    </Tab>
  );
};

export default TabHeader;
