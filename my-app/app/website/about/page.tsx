"use client";
import { WebsiteLayout } from '../../../components/WebsiteLayout';
import { AboutPage } from '../../../components/AboutPage';

export default function About() {
  const handleNavigate = (screen: string) => {
    // For Next.js routing, we would typically use router.push()
    // But for now, we'll just log the navigation
    console.log('Navigating to:', screen);
    // In a real implementation, you might want to use Next.js router:
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push(`/${screen.replace('website-', '')}`);
  };

  return (
    <WebsiteLayout onNavigate={handleNavigate}>
      <AboutPage onNavigate={handleNavigate} />
    </WebsiteLayout>
  );
}
