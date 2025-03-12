import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../Button';
import React from 'react';

export const Breadcrumbs = ({ crumbs }: { crumbs: string[] }) => {
  return (
    <div className='mb-4 flex items-center gap-2'>
      {crumbs.map((crumb, index) => {
        const link = !crumbs[index + 1]
          ? '.'
          : `/park/${crumbs
              .slice(0, index + 1)
              .map((c) => c.replace(/ /g, '-').toLowerCase())
              .join('/')}`;
        return (
          <React.Fragment key={crumb}>
            {index > 0 && <ChevronRight />}
            <Crumb link={link} title={crumb.replace(/-/g, ' ')} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Crumb = ({ link, title }: { link: string; title: string }) => (
  <Button className='capitalize hover:underline'>
    <Link to={link}>{title}</Link>
  </Button>
);
