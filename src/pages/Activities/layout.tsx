import { useSearchParams } from 'react-router';
import { ThingToDo } from '../ThingToDo';
import { Tour } from '../Tour';

export const ActivityLayout = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  if (type === 'thingstodo') {
    return <ThingToDo />;
  }
  if (type === 'tours') {
    return <Tour />;
  }

  return (
    <div className='container mx-auto mt-24'>Get All Potential Activities</div>
  );
};
