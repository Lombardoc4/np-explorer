import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, Children, ReactElement, ReactNode } from 'react';
import { useSidebar } from '../ui/sidebar';

interface SidebarProps {
  children?: ReactNode;
}

interface SidebarChildProps {
  collapsed: boolean;
}
const iconSize = 24;
export const Sidebar = ({ children }: SidebarProps) => {
  const { toggleSidebar, state } = useSidebar();
  return (
    <nav
      className={`bg-muted relative hidden p-4 pt-24 shadow-md transition-all sm:block ${
        state === 'collapsed' ? 'w-16' : 'w-48'
      } hidden`}
    >
      <div
        className='bg-accent absolute top-18 right-0 translate-x-[50%] cursor-pointer rounded-full opacity-50 shadow hover:opacity-100'
        onClick={toggleSidebar}
      >
        {state === 'collapsed' ? (
          <ChevronRight size={iconSize} />
        ) : (
          <ChevronLeft size={iconSize} />
        )}
      </div>

      <div>
        {Children.map(children, (child) =>
          React.isValidElement<SidebarChildProps>(child)
            ? React.cloneElement(child as ReactElement<SidebarChildProps>, {
                ...child.props, // Preserve other existing props
                collapsed: state === 'collapsed', // Inject collapsed prop into child
              })
            : child,
        )}
      </div>
    </nav>
  );
};
