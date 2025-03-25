import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useParams, useSearchParams } from 'react-router';
import { AllThingsToDo } from './thingstodo';
import { AllTours } from './tours';
import SEO from '@/components/SEO';
import { AllEvents } from './events';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tabs = ['events', 'tours', 'things-to-do'];
const tabContent = {
  events: <AllEvents />,
  tours: <AllTours />,
  'things-to-do': <AllThingsToDo />,
};

export const Activities = () => {
  const { parkId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  const handleTabChange = (val: string) => {
    setSearchParams((prev) => {
      prev.set('type', val);
      return prev;
    });
  };

  return (
    <>
      <SEO
        title={`${parkId?.toUpperCase()} | Activities`}
        description='Explore events, things to do, and tours at ${parkId?.toUpperCase()} provided by the USNP'
      />
      <main className='container mx-auto my-20 px-4 sm:px-0'>
        <Breadcrumbs crumbs={[parkId as string, 'activities']} />

        <Tabs
          defaultValue={type || tabs[0]}
          className='w-full'
          onValueChange={handleTabChange}
        >
          <TabsList className='mb-4 w-full'>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.replace(/-/g, '')}
                className='capitalize'
              >
                {tab.replace(/-/g, ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={'content-' + tab} value={tab.replace(/-/g, '')}>
              {tabContent[tab as keyof typeof tabContent]}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </>
  );
};
