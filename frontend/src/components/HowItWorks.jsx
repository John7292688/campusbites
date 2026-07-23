import { howItWorksSteps } from "../constants/homepageData";

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-title">
          <h2>How CampusBites Works</h2>
          <p>
            Ordering food around campus has never been easier.
          </p>
        </div>

        <div className="steps-grid">
          {howItWorksSteps.map((step) => (
            <div className="step-card" key={step.id}>
              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;