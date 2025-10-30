'use client'
import { useRouter } from 'next/navigation';
import { WebsiteLayout } from '../../components/WebsiteLayout'
import { HomePage } from '../../components/HomePage'

export default function WebsiteHomePage() {
  const router = useRouter();

  const handleNavigate = (screen: string) => {
    if (screen === 'auth') {
      router.push('/auth');
    } else if (screen.startsWith('website-')) {
      // Handle other website-specific routes if needed
      const route = screen.replace('website-', '/');
      router.push(route);
    }
  };

  return (
    <WebsiteLayout onNavigate={handleNavigate}>
      <HomePage onNavigate={handleNavigate} />
    </WebsiteLayout>
  )
}
