import { ReactNode } from 'react';

interface TContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: React.FC<TContainerProps> = (
  props: TContainerProps
) => {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  );
};
