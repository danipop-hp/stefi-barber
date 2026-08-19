
import { Hero } from '@/components/hero';
import { VideoGallerySection } from '@/components/video-gallery';
import { Services } from '@/components/services';
import BookingSection from '@/components/booking-section'; 
import SectionAnimator from '@/components/section-animator';

export default function Home() {
  return (
    <main>
    

      <SectionAnimator>
        <Hero />
      </SectionAnimator>

      <SectionAnimator>
        <VideoGallerySection />
      </SectionAnimator>

      <SectionAnimator>
        <Services />
      </SectionAnimator>

      <SectionAnimator>
        <BookingSection />
      </SectionAnimator>
    </main>
  );
}