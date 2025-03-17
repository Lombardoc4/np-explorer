import { fetcher } from '../../utils/helper';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import Modal from '@/components/Modal/modal';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const endpoint = 'events';

export const AllEvents = () => {
  const { parkId } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const {
    status,
    error,
    data: events,
  } = useQuery<NPSEvent[]>({
    queryKey: ['park', { catergory: endpoint, parkCode: parkId }],
    queryFn: async () => await fetcher(`${endpoint}?parkCode=${parkId}`),
  });

  if (status === 'pending') {
    return (
      <div className='flex h-96 items-center justify-center'>
        <Loader />;
      </div>
    );
  }

  if (error || !events || events.length <= 0) return <></>;

  const eventDays = events.flatMap((event) =>
    event.dates.map((date) => new Date(date)),
  );
  console.log('eventDays', date);
  return (
    <section className='grid grid-cols-4'>
      <div className='sticky top-20 h-fit px-4'>
        <h2 className='text-center text-2xl'>Upcoming Events</h2>

        <Calendar
          mode='single'
          // numberOfMonths={2}
          selected={date}
          className='w-full'
          classNames={{
            head_row: 'flex w-full mt-2 justify-center',
            row: 'flex w-full justify-center',
            month: 'w-full',
          }}
          onSelect={setDate}
          modifiers={{
            eventDay: eventDays,
          }}
          modifiersClassNames={{
            eventDay: 'border border-secondary',
          }}
        />
        <div className='grid gap-2 rounded-xl border p-4'>
          {date && (
            <h3 className='text-center text-xl'>
              {new Date(date).toDateString()}
            </h3>
          )}
          <div className='border-t py-2'>
            <p className='font-medium'>Time of day</p>
            <RadioGroup
              defaultValue='comfortable'
              onValueChange={(val) =>
                setFilters({ ...filters, timeOfDay: val })
              }
            >
              {['AM', 'PM'].map((time) => (
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value={time} id={time} />
                  <Label htmlFor={time}>{time}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className='border-t py-2'>
            <p className='font-black'>Registration Required</p>
            <RadioGroup defaultValue='comfortable'>
              {['Yes', 'No'].map((regRequired) => (
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem
                    value={regRequired}
                    id={'regRequired-' + regRequired}
                  />
                  <Label htmlFor={'regRequired-' + regRequired}>
                    {regRequired}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className='col-span-3 grid gap-4'>
        {date &&
          events &&
          events
            .filter((event) => {
              return event.dates.some((eventDate) => {
                const eventDay = new Date(eventDate).setHours(0, 0, 0, 0);
                const selectedDay = date?.setHours(0, 0, 0, 0);
                return eventDay === selectedDay;
              });
            })
            .slice(0, 10)
            .map((event) => <EventItem event={event} />)}
      </div>

      {/* <div className='grid grid-cols-4 gap-4'>
        {events.map((event: NPSEvent) => (
          <CategoryCard data={event} />
        ))}
      </div> */}
    </section>
  );
};

const EventItem = ({ event }: { event: NPSEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
    console.log('close');
  };

  return (
    <>
      <div
        className='grid rounded-xl border p-4'
        key={event.id}
        onClick={() => setIsModalOpen(true)}
      >
        <p className='line-clamp-2 font-black'>{event.title}</p>
        {event.times.map((time) => (
          <p key={time.timestart}>
            {time.timestart} - {time.timeend}
          </p>
        ))}
      </div>
      <Modal
        type={'event'}
        title={event.title}
        subtitle={event.category}
        isOpen={isModalOpen}
        onClose={closeModal}
        content={
          <>
            <div>
              {event.times.map((time) => (
                <p key={time.timestart}>
                  {time.timestart} - {time.timeend}
                </p>
              ))}
            </div>
            {event.feeinfo && (
              <>
                <a href={event.feeinfo} target='_blank'>
                  Fee Information
                </a>
                <hr className='my-2' />
              </>
            )}
            {event.isregresrequired === 'true' && (
              <>
                <div className='grid grid-cols-2'>
                  <p>
                    Registration is required <br />
                    <a href={event.regresurl} target='_blank'>
                      Register here
                    </a>
                  </p>
                  {event.regresinfo && <p>{event.regresinfo}</p>}
                </div>
                <hr className='my-2' />
              </>
            )}
            <div dangerouslySetInnerHTML={{ __html: event.description }}></div>
          </>
        }
      />
    </>
  );
};
