const ContactPhone = ({ type, number }: { type: string; number: string }) => {
  // const icon = type === "TTY" ? <Speech /> : <Phone />;

  if (type === 'Fax' || number.length <= 0) return <></>;

  return (
    <div className='flex w-full items-center gap-4'>
      {/* {icon} */}
      <a href={`tel:${number}`} className='hover:underline'>
        {type}: {number.replace('/', '-')}
      </a>
    </div>
  );
};

const ContactEmail = ({ email }: { email: string }) => (
  <>
    {email.length > 0 && email !== '0@0' && (
      <div className='flex w-full items-center gap-4'>
        {/* <MailPlus/> */}
        <a href={`mailto:${email}`} className='hover:underline'>
          {email}
        </a>
      </div>
    )}
  </>
);

export const ContactCard = ({
  contacts,
  children,
}: {
  contacts: IPark['contacts'];
  children?: React.ReactNode;
}) => {
  if (!contacts) return;
  return (
    <div id='contact'>
      {contacts.phoneNumbers.length > 0 &&
        contacts.phoneNumbers.map(
          ({ type, phoneNumber }: { type: string; phoneNumber: string }) => (
            <ContactPhone key={phoneNumber} type={type} number={phoneNumber} />
          ),
        )}
      {contacts.emailAddresses.length > 0 &&
        contacts.emailAddresses.map(
          ({ emailAddress }: { emailAddress: string }) => (
            <ContactEmail key={emailAddress} email={emailAddress} />
          ),
        )}

      {children}
    </div>
  );
};
