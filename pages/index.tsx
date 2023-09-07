export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import Hero from "example/components/Landing/hero";
import Layout from './landingpage/layout';
export default function Home() {
  return (
    <>
      <Layout>
        <Hero />
        {/* <Features />
        <Zigzag />
        <Testimonials />
        <Newsletter /> */}
      </Layout>
    </>
  );
}
