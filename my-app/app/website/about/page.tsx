"use client";
import { WebsiteLayout } from '../../../components/WebsiteLayout';
import { AboutPage } from '../../../components/AboutPage';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  const handleNavigate = (screen: string) => {
    if (screen === 'auth') {
      router.push('/auth');
    } else if (screen.startsWith('website-')) {
      // Handle other website-specific routes
      const route = screen.replace('website-', '/');
      router.push(route);
    }
  };

  return (
    <WebsiteLayout onNavigate={handleNavigate}>
      <AboutPage onNavigate={handleNavigate} />
    </WebsiteLayout>
  );
}
