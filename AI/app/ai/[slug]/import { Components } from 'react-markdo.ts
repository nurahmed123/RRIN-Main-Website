import { Components } from 'react-markdown';
// ...
code: (props: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
  const { node, inline, className, children, ...rest } = props;
  // ... rest of the logic
}