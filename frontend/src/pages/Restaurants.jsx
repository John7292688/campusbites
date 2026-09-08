import "../styles/restaurantsPage.css";
import AllRestaurants from "../components/AllRestaurants";

function Restaurants() {
  return (
    <div className="restaurants-page">
      <section className="restaurants-hero">
        <div className="container">
          <div className="restaurants-header">
            <h1>Restaurants</h1>
            <p>
              Discover all approved restaurants available on CampusBites.
            </p>
          </div>
        </div>
      </section>

      <AllRestaurants />
    </div>
  );
}

export default Restaurants;