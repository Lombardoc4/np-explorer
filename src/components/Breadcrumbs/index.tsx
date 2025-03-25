import { Link } from 'react-router';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbLink,
} from '../ui/breadcrumb';

export const Breadcrumbs = ({ crumbs }: { crumbs: string[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => {
          const title = crumb.replace(/-/g, ' ');
          const link = !crumbs[index + 1]
            ? '.'
            : `/${crumbs
                .slice(0, index + 1)
                .map((c) => c.replace(/ /g, '-').toLowerCase())
                .join('/')}`;
          return (
            <React.Fragment key={crumb}>
              {index !== 0 && <BreadcrumbSeparator />}
              <Crumb link={link} title={title} />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Crumb = ({ link, title }: { link: string; title: string }) => (
  <BreadcrumbItem>
    <BreadcrumbLink asChild className='uppercase'>
      <Link to={link}>{title}</Link>
    </BreadcrumbLink>
  </BreadcrumbItem>
);
