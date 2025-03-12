import { Accessibility, Dog, DollarSign } from 'lucide-react';
import React from 'react';

const QuickFacts = ({
  accessibilityInformation,
  age,
  ageDescription,
  petsDescription,
  arePetsPermitted,
  arePetsPermittedWithRestrictions,
  doFeesApply,
  feeDescription,
  isReservationRequired,
  reservationDescription,
  location,
  locationDescription,
}: IThingToDo) => {
  return (
    <>
      <div className='fact-item py-2'>
        <Accessibility />
        <div
          className='fact-info'
          dangerouslySetInnerHTML={{
            __html: `<strong>Accessibility:</strong> ${accessibilityInformation}`,
          }}
        />
      </div>
      <div className='fact-item py-2'>
        <Dog />
        <div className='fact-info'>
          <strong>Pets</strong>
          <p className={arePetsPermitted !== 'Yes' ? 'line-through' : ''}>
            Permitted
          </p>
          <p
            className={
              arePetsPermittedWithRestrictions !== 'Yes' ? 'line-through' : ''
            }
          >
            Permitted with Restrictions
          </p>
          {petsDescription && (
            <p dangerouslySetInnerHTML={{ __html: petsDescription }} />
          )}
        </div>
      </div>
      {age && (
        <div className='fact-item py-2'>
          <span className='icon'>📅</span>
          <div className='fact-info'>
            <strong>Age:</strong> {age}
            {ageDescription && (
              <p dangerouslySetInnerHTML={{ __html: ageDescription }} />
            )}
          </div>
        </div>
      )}
      <div className='fact-item py-2'>
        <DollarSign />
        <div className='fact-info'>
          <p>
            <strong>{doFeesApply !== 'Yes' && 'No'} Fees</strong>
          </p>
          {feeDescription && (
            <p dangerouslySetInnerHTML={{ __html: feeDescription }} />
          )}
          <p>
            <strong>Reservation Required:</strong>{' '}
            {!!isReservationRequired && isReservationRequired ? 'Yes' : 'No'}
          </p>
          {reservationDescription && (
            <p dangerouslySetInnerHTML={{ __html: reservationDescription }} />
          )}
        </div>
      </div>
      {locationDescription && (
        <div className='fact-item py-2'>
          <span className='icon'>📅</span>
          <div className='fact-info'>
            <p>{location}</p>
            {locationDescription && (
              <p dangerouslySetInnerHTML={{ __html: locationDescription }} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default QuickFacts;
