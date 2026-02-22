import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AmenitiesSection } from "@/components/amenities-section"
import { ProjectsSection } from "@/components/projects-section"
import { GallerySection } from "@/components/gallery-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { UserGuideSection } from "@/components/user-guide-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
 
import CallButton from "@/components/call-button"
import WhatsappButton from "@/components/whatsapp-button"
import NewsArticles from "@/components/news-articals"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main >
      <Navigation />
      <HeroSection />
      <AboutSection />
      <AmenitiesSection />
      <ProjectsSection />
      <GallerySection />
      <WhyChooseUsSection />
      <UserGuideSection />
      <TestimonialsSection />
      <NewsArticles/>
      <FAQSection />
      <ContactSection />
       <CallButton/>
      <WhatsappButton />
      <Footer />
    </main>
  )
}
