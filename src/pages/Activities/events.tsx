import { fetcher } from '../../utils/helper';
import { Loader } from '../../components/Loader';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DateRange } from 'react-day-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const endpoint = 'events';

export const AllEvents = () => {
  const { parkId } = useParams();
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });
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
        <Loader />
      </div>
    );
  }

  if (error || !events || events.length <= 0) return <></>;

  const eventDays = events.flatMap((event) =>
    event.dates.map((date) => new Date(date)),
  );
  // console.log('eventDays', date);
  return (
    <section className='flex grid-cols-4 flex-col justify-center gap-4 md:grid'>
      <div className='top-20 h-fit md:sticky'>
        <h2 className='text-center text-2xl'>Upcoming Events</h2>

        {/* Use drawer */}
        <Calendar
          mode='range'
          // numberOfMonths={2}
          selected={date}
          className='w-full'
          classNames={{
            head_row: 'flex w-full mt-2 justify-center',
            row: 'flex w-full justify-center',
            month: 'w-full',
          }}
          onSelect={(range) => range && setDate(range)}
          modifiers={{
            eventDay: eventDays,
          }}
          modifiersClassNames={{
            eventDay: 'border border-secondary',
          }}
        />
        <div className='grid rounded-xl border p-4'>
          <p className='mb-2 text-center md:text-xl'>
            {date.from?.toDateString()}{' '}
            {date.to && date.from !== date.to && (
              <>
                - <br className='hidden md:block' />
                {date.to?.toDateString()}
              </>
            )}
          </p>
          <div className='flex gap-4 border-t py-2 sm:block'>
            <p className='font-medium'>Time of day</p>
            <RadioGroup
              className='flex gap-4 md:mt-1'
              defaultValue='all'
              onValueChange={(val) =>
                setFilters({ ...filters, timeOfDay: val })
              }
            >
              {['All', 'AM', 'PM'].map((time) => (
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value={time} id={time} />
                  <Label htmlFor={time}>{time}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className='flex gap-4 border-t py-2 sm:block'>
            <div className='flex gap-4'>
              <Label className='font-black'>Registration Required</Label>
              <Checkbox />
            </div>
          </div>
        </div>
      </div>
      <div className='grid h-fit gap-4 md:col-span-3'>
        {date &&
          events &&
          events
            .filter((event) => {
              return event.dates.some((eventDate) => {
                const eventDay = new Date(eventDate).setHours(0, 0, 0, 0);
                const selectedFrom = date.from?.setHours(0, 0, 0, 0);
                const selectedTo = date.to?.setHours(0, 0, 0, 0);
                return (
                  selectedFrom &&
                  selectedTo &&
                  eventDay >= selectedFrom &&
                  eventDay <= selectedTo
                );
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
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className='rounded-xl border p-4'>
            <p className='line-clamp-2 font-black'>{event.title}</p>
            {event.times.map((time) => (
              <p key={time.timestart}>
                {time.timestart} - {time.timeend}
              </p>
            ))}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-xl'>{event.title}</DialogTitle>
            <DialogDescription className=''>
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
              <div
                dangerouslySetInnerHTML={{ __html: event.description }}
              ></div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
