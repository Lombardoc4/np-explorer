import { featureInfo } from './descriptions';

export const Description = () => (
  <div className='grid min-h-svh items-center bg-black text-white'>
    <div className='container mx-auto mb-16 px-4 py-16 md:mt-16 lg:px-0'>
      <h2 className='mb-8 text-3xl font-thin uppercase md:mb-16 md:text-6xl'>
        A modern look to
        <br /> the National Parks Service...
      </h2>
      <div className='mx-auto grid w-fit gap-16 md:grid-cols-2 xl:grid-cols-3 xl:gap-[96px]'>
        <Features />
      </div>
    </div>
  </div>
);

const Features = () => {
  return featureInfo.map(({ icon, title, description }) => (
    <div key={title} className='container max-w-3xl'>
      <div className='grid'>
        {icon}
        <h3 className='text-2xl font-thin md:text-4xl xl:text-5xl'>{title}</h3>
      </div>
      <p className='col-span-2 mt-1 grow-1 border-t pt-1 text-justify'>
        {description}
      </p>
    </div>
  ));
};
