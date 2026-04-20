import PageHero from '@/components/PageHero';
import CompanyIntro from '@/components/CompanyIntro';
import Partners from '@/components/Partners';
import Services from '@/components/Services';
import TechExpertise from '@/components/TechExpertise';
import GrowthDiscipline from '@/components/GrowthDiscipline';
import ExecutionQuality from '@/components/ExecutionQuality';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <PageHero />
      <main>
        <CompanyIntro />
        <Partners />
        <Services />
        <TechExpertise />
        <GrowthDiscipline />
        <ExecutionQuality />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
