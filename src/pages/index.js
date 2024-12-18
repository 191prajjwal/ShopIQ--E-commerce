import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductListing from '@/components/ProductListing';  // Import ProductListing component

export default function Home() {
  return (
    <>
      <Head>
        <title>E-commerce Website</title>
        <meta name="description" content="A modern e-commerce platform" />
      </Head>
      <main>
        <HeroSection />
        
        {/* Product Listing Section */}
        <section className="product-listing-section py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
          <ProductListing /> {/* Add ProductListing here */}
        </section>
      </main>
    </>
  );
}
