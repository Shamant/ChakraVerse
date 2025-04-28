'use client';

import { use } from 'react';
import RootChakra from '../../../../components/RootChakra';
import SacralChakra from '../../../../components/SacralChakra';
import CrownChakra from '../../../../components/CrownChakra';
import HeartChakra from '../../../../components/HeartChakra';
import SolarChakra from '../../../../components/SolarChakra';
import ThirdEyeChakra from '../../../../components/ThirdEyeChakra';
import ThroatChakra from '../../../../components/ThroatChakra';

export default function ChakraPage({ params }: { params: Promise<{ page: string }> }) {
  let { page } = use(params);

  page = page.replace('%20', '').toLowerCase();
  
  const chakraComponentMap: Record<string, React.ReactNode> = {
    root: <RootChakra />,
    sacral: <SacralChakra />,
    crown: <CrownChakra />,
    heart: <HeartChakra />,
    solar: <SolarChakra />,
    thirdeye: <ThirdEyeChakra />,
    throat: <ThroatChakra />,
  };

  return (
    <main className="min-h-screen">
      {chakraComponentMap[page] ?? (
        <div className="text-white p-10">Invalid Chakra</div>
      )}
    </main>
  );
}
