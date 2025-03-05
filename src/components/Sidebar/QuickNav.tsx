import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import { iconMap } from '../../utils/lib/iconMap';

interface QuickNavProps {
  sections: { id: keyof typeof iconMap; label: string }[];
}

export const QuickNav = ({ sections }: QuickNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-muted fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-lg shadow-lg sm:hidden dark:shadow-white/15'>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between px-4 py-3 text-lg font-medium'
      >
        Quick Navigation
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className='grid max-h-68 divide-y divide-gray-800 overflow-y-auto border-t px-4 dark:divide-gray-400'>
          {sections.map((section) => {
            const Icon = iconMap[section.id];
            return (
              <li key={section.id}>
                <Link
                  to={section.id}
                  containerId='main-content'
                  smooth={true}
                  duration={300}
                  offset={-90}
                  onClick={() => setIsOpen(false)}
                  className='flex w-full gap-2 py-2'
                >
                  <Icon />
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
