'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'alert' | 'fees' | 'feedback' | 'share' | 'image' | 'event';
  content: any;
  title?: string;
  subtitle?: string;
  actions?: { label: string; onClick: () => void }[];
}

const Modal = ({
  isOpen,
  onClose,
  type,
  content,
  title,
  subtitle,
  actions,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-lg p-6'>
        <DialogHeader>
          {subtitle && <p className='text-sm'>{subtitle}</p>}
          <DialogTitle>{title || defaultTitle(type)}</DialogTitle>
        </DialogHeader>

        <div>{renderContent(type, content)}</div>

        <DialogFooter className='mt-2 flex justify-end space-x-2'>
          {actions?.map((action, idx) => (
            <Button key={idx} onClick={action.onClick} variant='default'>
              {action.label}
            </Button>
          ))}
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const defaultTitle = (type: ModalProps['type']) => {
  switch (type) {
    case 'alert':
      return 'Park Alert';
    case 'fees':
      return 'Fee Information';
    case 'feedback':
      return 'Submit Feedback';
    case 'share':
      return 'Share this Park';
    case 'image':
      return 'Image Viewer';
    default:
      return 'Modal';
  }
};

const renderContent = (type: ModalProps['type'], content: any) => {
  switch (type) {
    case 'alert':
      return <p>{content}</p>;
    case 'fees':
      return (
        <ul className='text-gray-700'>
          {content.fees.map((fee: any) => (
            <li key={fee.id}>
              <strong>{fee.title}:</strong> ${fee.amount}
            </li>
          ))}
        </ul>
      );
    case 'feedback':
      return <FeedbackForm />;
    case 'share':
      return <ShareLink url={content.url} />;
    case 'image':
      return <ImageViewer src={content.imageUrl} />;
    case 'event':
      return content;
    default:
      return null;
  }
};

// Feedback Form Component
const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Feedback submitted: ${feedback}`);
      }}
      className='space-y-3'
    >
      <textarea
        className='w-full rounded border border-gray-300 p-2'
        placeholder='Enter your feedback...'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button type='submit' className='w-full'>
        Submit
      </Button>
    </form>
  );
};

// Share Link Component
const ShareLink = ({ url }: { url: string }) => {
  const copyToClipboard = () => navigator.clipboard.writeText(url);

  return (
    <div className='flex items-center space-x-2'>
      <input value={url} readOnly className='w-full rounded border p-2' />
      <Button onClick={copyToClipboard}>Copy</Button>
    </div>
  );
};

// Image Viewer Component
const ImageViewer = ({ src }: { src: string }) => (
  <div className='flex justify-center'>
    <img src={src} alt='Park Image' className='max-w-full rounded' />
  </div>
);

export default Modal;
