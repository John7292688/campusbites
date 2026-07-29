import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedRestaurants from "../components/FeaturedRestaurants";
import HowItWorks from "../components/HowItWorks";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedRestaurants />
      <HowItWorks />
    </>
  );
}

export default Home;