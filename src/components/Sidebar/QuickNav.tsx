import { Link } from 'react-scroll';
import { iconMap } from '../../lib/iconMap';

interface QuickNavProps {
  sections: { id: keyof typeof iconMap; label: string }[];
}

export const QuickNav = ({ sections }: QuickNavProps) => {
  return (
    <div className='bg-muted fixed bottom-4 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-lg border shadow-lg sm:hidden dark:shadow-white/15'>
      <div
        className='grid max-h-68 justify-center divide-x divide-gray-800 overflow-y-auto dark:divide-gray-400'
        style={{
          gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))`,
        }}
      >
        {sections.map((section) => {
          const Icon = iconMap[section.id];
          return (
            <Link
              key={section.id}
              to={section.id}
              containerId='main-content'
              smooth={true}
              duration={300}
              offset={-24}
              className='flex items-center justify-center py-2'
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
