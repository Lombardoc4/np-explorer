export const daysOfWeek: Array<keyof OperatingHours['standardHours']> = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const getOperatingHours = (operatingHours: OperatingHours) => {
  const { standardHours } = operatingHours;

  // See if all days values match
  if (
    standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] &&
    standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] &&
    standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] &&
    standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]] &&
    standardHours[daysOfWeek[4]] === standardHours[daysOfWeek[5]] &&
    standardHours[daysOfWeek[5]] === standardHours[daysOfWeek[6]]
  ) {
    return (
      <p>
        <span style={{ textTransform: 'capitalize' }}>Monday - Sunday</span>:{' '}
        {standardHours[daysOfWeek[0]]}
      </p>
    );
  }

  // See if monday - friday values match
  if (
    standardHours[daysOfWeek[0]] === standardHours[daysOfWeek[1]] &&
    standardHours[daysOfWeek[1]] === standardHours[daysOfWeek[2]] &&
    standardHours[daysOfWeek[2]] === standardHours[daysOfWeek[3]] &&
    standardHours[daysOfWeek[3]] === standardHours[daysOfWeek[4]]
  ) {
    return (
      <>
        <p>
          <span style={{ textTransform: 'capitalize' }}>Monday - Friday</span>:{' '}
          {standardHours[daysOfWeek[0]]}
        </p>
        <p>
          <span style={{ textTransform: 'capitalize' }}>saturday</span>:{' '}
          {operatingHours.standardHours['saturday']}
        </p>
        <p>
          <span style={{ textTransform: 'capitalize' }}>sunday</span>:{' '}
          {operatingHours.standardHours['sunday']}
        </p>
      </>
    );
  }

  return daysOfWeek.map((day: keyof OperatingHours['standardHours']) => {
    if (operatingHours.standardHours[day] !== '') {
      return (
        <p>
          <span style={{ textTransform: 'capitalize' }}>{day}</span>:{' '}
          {operatingHours.standardHours[day]}
        </p>
      );
    }
  });
};

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  // console.log('input', input.toString())
  const limit = !input.toString().includes('&limit=') ? '&limit=500' : '';
  const url = `https://developer.nps.gov/api/v1/${input}${limit}&api_key=${import.meta.env.VITE_NPS_API_KEY}`;
  const res = await fetch(url, init);
  const data = await res.json();

  // Set Local Storage for indepth data

  return data.data;
};
