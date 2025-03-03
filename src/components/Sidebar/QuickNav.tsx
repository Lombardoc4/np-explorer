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
    <div className='fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-lg bg-[var(--color-bg-2)] shadow-lg sm:hidden'>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex w-full items-center justify-between px-4 py-3 text-lg font-medium text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]'
      >
        Quick Navigation
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className='max-h-68 overflow-y-auto border-t border-[var(--color-divider-light)] px-4 dark:border-[var(--color-divider-dark)]'>
          {sections.map((section) => {
            const Icon = iconMap[section.id];
            return (
              <li
                key={section.id}
                className='border-gray-500 text-green-700 hover:text-green-900 dark:text-green-600 dark:hover:text-green-400'
              >
                <Link
                  to={section.id}
                  containerId='main-content'
                  smooth={true}
                  duration={300}
                  offset={-90}
                  onClick={() => setIsOpen(false)}
                  className='flex w-full gap-2 border-b py-2 text-left'
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
