import { BotIcon, Clipboard, Mail, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';

export const ShareModal = ({ name }: { name: string }) => {
  const link = window.location.href;

  return (
    <Dialog>
      <DialogTrigger className='flex flex-col items-center'>
        <Share2 />
        <p>Share</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Share {name}</DialogTitle>
          <DialogDescription>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-2 overflow-hidden rounded-xl border p-2 px-3 shadow'>
                <input
                  className='flex-1 outline-0'
                  type='text'
                  name='url'
                  id='url'
                  readOnly
                  value={link}
                />
                <div className='flex items-center justify-center'>
                  <Clipboard size={16} />
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4'>
                <Button>
                  <Mail /> Email
                </Button>
                <Button>
                  <BotIcon /> Facebook
                </Button>
                <Button>
                  <BotIcon /> X
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
