import clsx from 'clsx';

export const Button = ({
  children,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...props}
      className={clsx(
        'flex flex-col items-center rounded px-2 py-1 text-center',
        props.className,
      )}
    >
      {children}
    </button>
  );
};
