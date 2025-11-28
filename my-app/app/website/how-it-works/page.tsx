"use client";
import { WebsiteLayout } from '../../../components/WebsiteLayout';
import { HowItWorksPage } from '../../../components/HowItWorksPage';
import { useRouter } from 'next/navigation';

export default function HowItWorks() {
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
      <HowItWorksPage onNavigate={handleNavigate} />
    </WebsiteLayout>
  );
}
