import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import FeaturedPackages from "../components/FeaturedPackages";
import HowItWorks from "../components/HowItWorks";

function Home() {
  return (
    <>
      <Hero />

      <Categories />

      <FeaturedRestaurants />

      <FeaturedPackages />

      <HowItWorks />

    </>
  );
}

export default Home;