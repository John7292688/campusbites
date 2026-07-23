function Hero() {
  return (
    <section className="hero">
      <h1>
        Order Delicious Food <span>Around Campus</span> In Minutes.
      </h1>

      <p>
        Fast, fresh, and delivered straight to your hostel, lecture hall, or
        department.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search restaurant, meal, or category..."
        />

        <button>Search</button>
      </div>
    </section>
  );
}

export default Hero;