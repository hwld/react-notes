import React from 'react';
import { PresistentDrawer } from './PresistentDrawer';
import { SwipeableDrawer, SwipeableDrawerProps } from './SwipeableDrawer';

const Component: React.FC<SwipeableDrawerProps & {
  className?: string;
  isPresistent: boolean;
}> = ({ children, open, width, isPresistent, className, ...rest }) => {
  return isPresistent ? (
    <PresistentDrawer
      open={open}
      width={width}
      aria-label="presistentDrawer"
      className={className}
    >
      {children}
    </PresistentDrawer>
  ) : (
    <SwipeableDrawer
      open={open}
      width={width}
      {...rest}
      aria-label="normalDrawer"
      className={className}
    >
      {children}
    </SwipeableDrawer>
  );
};

export const Drawer = Component;
