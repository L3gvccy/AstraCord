import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const HeaderRoot = ({ children }: Props) => {
  return <div className="flex flex-col gap-2 pb-2 border-b">{children}</div>;
};

const HeaderTitle = ({ children }: Props) => {
  return <p className="text-2xl font-semibold">{children}</p>;
};

const HeaderDescription = ({ children }: Props) => {
  return <p className="text-sm opacity-85">{children}</p>;
};

export const DashboardOutletHeader = Object.assign(HeaderRoot, {
  Title: HeaderTitle,
  Description: HeaderDescription,
});
