import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"

// Above-the-fold: load eagerly
// Everything below the fold: lazy-load with next/dynamic (code-split + deferred JS)
 
const Project51Section = dynamic(() => import("@/components/project-51-section").then(m => ({ default: m.Project51Section })))
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(m => ({ default: m.ProjectsSection })))
const GallerySection = dynamic(() => import("@/components/gallery-section").then(m => ({ default: m.GallerySection })))
const WhyChooseUsSection = dynamic(() => import("@/components/why-choose-us-section").then(m => ({ default: m.WhyChooseUsSection })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(m => ({ default: m.TestimonialsSection })))
const FAQSection = dynamic(() => import("@/components/faq-section").then(m => ({ default: m.FAQSection })))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })))
const CallButton = dynamic(() => import("@/components/call-button"))
const WhatsappButton = dynamic(() => import("@/components/whatsapp-button"))
const ContactPopup = dynamic(() => import("@/components/contact-popup"))
const Locations = dynamic(() => import("@/components/locations").then(m => ({ default: m.LocationsSection })))
export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <Project51Section />
      <ContactSection />
      <ProjectsSection />
      <GallerySection />
      <WhyChooseUsSection />
      <Locations />
      <TestimonialsSection />
      <FAQSection />
      <CallButton />
      <WhatsappButton />
      <ContactPopup />
      <Footer />
    </main>
  )
}