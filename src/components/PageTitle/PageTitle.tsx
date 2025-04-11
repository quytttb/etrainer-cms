import { ReactNode } from "react";

interface IPageTitleProps {
  title: string;
  renderButton?: () => ReactNode;
}

const PageTitle = ({ title, renderButton }: IPageTitleProps) => {
  return (
    <div className="px-4 bg-white rounded-lg shadow h-15 items-center flex">
      <p className="text-lg font-semibold">{title}</p>

      <div className="ml-auto">{renderButton && renderButton()}</div>
    </div>
  );
};

export default PageTitle;
