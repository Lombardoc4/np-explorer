import { LoaderCircle } from 'lucide-react';

export const Loader = () => <LoaderCircle className='animate-spin' size={64} />;
export const FullHeightLoader = () => (
  <div className='flex min-h-svh items-center justify-center'>
    <Loader />
  </div>
);
