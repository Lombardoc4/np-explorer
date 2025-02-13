import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../Button';
import { endpoint } from '../../pages/Camping';

export const Breadcrumbs = ({
  parkId,
  category,
  name,
}: {
  parkId?: string;
  category?: string;
  name?: string;
}) => {
  category = endpoint.replace(/ /g, '-').toLowerCase();
  return (
    <div className='mb-4 flex items-center gap-2'>
      {parkId && (
        <Crumb link={`/park/${parkId}`} title={parkId.toUpperCase()} />
      )}
      {category && (
        <>
          <ChevronRight />
          <Crumb link={`/park/${parkId}/${category}`} title={category} />
        </>
      )}
      {name && (
        <>
          <ChevronRight />
          <Crumb link={`/park/${parkId}/${category}/${name}`} title={name} />
        </>
      )}
    </div>
  );
};

const Crumb = ({ link, title }: { link: string; title: string }) => (
  <Button className='capitalize hover:underline'>
    <Link to={link}>{title}</Link>
  </Button>
);
