"use client";
import { WebsiteLayout } from '../../../components/WebsiteLayout';
import { PricingPage } from '../../../components/PricingPage';
import { useRouter } from 'next/navigation';

export default function Pricing() {
  const router = useRouter();

  const handleNavigate = (screen: string) => {
    if (screen === 'auth') {
      router.push('/auth');
    } else if (screen.startsWith('website-')) {
      const route = screen.replace('website-', '/');
      router.push(route);
    }
  };

  return (
    <WebsiteLayout onNavigate={handleNavigate}>
      <PricingPage onNavigate={handleNavigate} />
    </WebsiteLayout>
  );
}
