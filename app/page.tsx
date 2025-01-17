import { Hero } from '@/components/sections/hero';
import { CarrierLogos } from '@/components/sections/carrier-logos';
import { Features } from '@/components/sections/features';
import { Stats } from '@/components/sections/stats';
import { HowItWorks } from '@/components/sections/how-it-works';
import { FeaturedIn } from '@/components/sections/featured-in';
import { Testimonials } from '@/components/sections/testimonials';
import { FAQ } from '@/components/sections/faq';
import { CTA } from '@/components/sections/cta';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CarrierLogos />
      <Features />
      <Stats />
      <HowItWorks />
      <FeaturedIn />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}