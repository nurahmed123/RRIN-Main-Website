// 'use client';

// import { NavigationBar } from '@/components/navigation-bar';
// import { NewGroup } from '@/components/new-group';
// import { CallContent } from '@/components/call-content';

// const Calls = () => {
//   return (
//     <>
//       <NavigationBar trigger={<NewGroup />} />
//       <CallContent />
//     </>
//   );
// };

// export default Calls;

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Calls = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('https://meet.robosuperior.com/');
  }, [router]);

  return null; // Prevents rendering anything before redirect
};

export default Calls;

