import { Link } from 'react-router';
import Layout from '../Layout';
import { ParksDropdown } from '../components/Dropdown/ParksDropdown';
import { House } from 'lucide-react';

export default function ErrorPage({ error }: { error: Error | string }) {
  const errorMsg =
    typeof error === 'string' ? error : error.message || 'Unknown Error';

  return (
    <Layout>
      <div className='container mx-auto flex min-h-svh items-center justify-center'>
        <div className='relative min-w-sm'>
          <div className='mb-4 flex w-full items-end justify-between gap-4 border-b pb-4'>
            <h1 className='text-4xl font-light'>{errorMsg}</h1>
            <Link to='/'>
              <House size={48} absoluteStrokeWidth />
            </Link>
          </div>

          <ParksDropdown />
        </div>
      </div>
    </Layout>
  );
}
