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
      <div className='fact-item'>
        <span className='icon'>♿</span>
        <div
          className='fact-info'
          dangerouslySetInnerHTML={{
            __html: `<strong>Accessibility:</strong> ${accessibilityInformation}`,
          }}
        />
      </div>
      <div className='fact-item'>
        <span className='icon'>🐾</span>
        <div className='fact-info'>
          <strong>Pets</strong>
          <p>Pets Permitted: {arePetsPermitted === 'Yes' ? 'Yes' : 'No'}</p>
          <p>
            Pets Permitted with Restrictions:{' '}
            {arePetsPermittedWithRestrictions === 'Yes' ? 'Yes' : 'No'}
          </p>
          {petsDescription && (
            <p dangerouslySetInnerHTML={{ __html: petsDescription }} />
          )}
        </div>
      </div>
      {age && (
        <div className='fact-item'>
          <span className='icon'>📅</span>
          <div className='fact-info'>
            <strong>Age:</strong> {age}
            {ageDescription && (
              <p dangerouslySetInnerHTML={{ __html: ageDescription }} />
            )}
          </div>
        </div>
      )}
      <div className='fact-item'>
        <span className='icon'>📅</span>
        <div className='fact-info'>
          <p>
            <strong>Fees:</strong> {doFeesApply === 'Yes' ? 'Yes' : 'No'}
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
      <div className='fact-item'>
        <span className='icon'>📅</span>
        <div className='fact-info'>
          <p>{location}</p>
          {locationDescription && (
            <p dangerouslySetInnerHTML={{ __html: locationDescription }} />
          )}
        </div>
      </div>
    </>
  );
};

export default QuickFacts;
