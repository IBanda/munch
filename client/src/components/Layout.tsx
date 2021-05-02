interface Props {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
}

export default function Layout({ children, fluid, className }: Props) {
  return (
    <div className={`container${fluid ? '-fluid' : ''} ${className}`}>
      {children}
    </div>
  );
}
