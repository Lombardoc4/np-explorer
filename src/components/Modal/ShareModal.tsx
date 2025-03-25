import { useState } from 'react';
import { Modal } from '.';
import styled from 'styled-components';

import XIcon from '../../assets/icons/x.svg?react';
import { StyledCard } from '../styled/StyledCard';
import { Share2 } from 'lucide-react';

export const ShareModal = (name: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const link = window.location.href;
  // const copyClick = async () => {
  //   navigator.clipboard.writeText(link);
  // };
  // const emailClick = () => {};

  const modal = (
    <Modal
      isOpen={isOpen}
      closeAction={() => setIsOpen(false)}
      styles={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '1em',
        gap: '1em',
        fontSize: '1.5em',
        maxWidth: '350px',
      }}
    >
      <>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>Share:</h3>
            <button
              style={{ fontSize: '0.5em', padding: '0.25em' }}
              onClick={() => setIsOpen(false)}
            >
              <XIcon fill={'#fff'} />
            </button>
          </div>
          {name}
        </div>
        {/* <ShareCard onClick={copyClick}>
					Copy Link
				</ShareCard>
				<ShareCard as="a" href={`mailto:?subject=${park.fullName}?body=${link}`}>
					Email
				</ShareCard> */}
      </>
    </Modal>
  );

  const btn = (
    <a
      className='flex flex-col items-center justify-center'
      onClick={() => setIsOpen(true)}
      href='#'
    >
      <Share2 className='size-4 lg:size-6' />
      Share
    </a>
  );

  return [modal, btn];
};

const ShareCard = styled(StyledCard)`
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.5em;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    box-shadow: none;
  }
`;
