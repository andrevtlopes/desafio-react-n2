import React from 'react';

type Props = {
    children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <div className="max-w-screen-lg px-2 mx-auto mt-4 lg:px-0">
        {children}
    </div>
  )
}

export default Container;