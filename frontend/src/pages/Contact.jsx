import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendContactMessage } from "../services/contactService";
import "../styles/contact.css";

function Contact() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage(
        name,
        email,
        subject,
        message
      );

      toast.success(
        "Message sent successfully"
      );

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(
        error.message ||
          "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-badge">
              📞 Get In Touch
            </span>

            <h1>
              We'd Love To Hear
              <span> From You</span>
            </h1>

            <p>
              Need help with an order,
              restaurant partnership,
              delivery issue, or general
              enquiry? Our team is ready
              to help.
            </p>

            <div className="contact-hero-buttons">
              <button
                className="contact-primary-btn"
                onClick={() =>
                  (window.location.href =
                    "mailto:support@campusbites.com")
                }
              >
                Email Support
              </button>

              <button
                className="contact-secondary-btn"
                onClick={() =>
                  navigate("/partner")
                }
              >
                Become a Vendor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-card">
              <div className="contact-icon">
                📧
              </div>

              <h3>Email Support</h3>

              <p>
                support@campusbites.com
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                📞
              </div>

              <h3>Phone Number</h3>

              <p>
                +234 800 000 0000
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                📍
              </div>

              <h3>Location</h3>

              <p>
                Osun State, Nigeria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2>
                Send Us A Message
              </h2>

              <p>
                Have a question or
                feedback? Fill the form
                below and we'll get back
                to you.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
                }
              />

              <textarea
                rows="6"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <div className="container">
          <div className="section-header">
            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Quick answers to common
              questions.
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h3>
                How long does delivery
                take?
              </h3>

              <p>
                Most orders are delivered
                within 20–30 minutes
                depending on restaurant
                preparation time and
                distance.
              </p>
            </div>

            <div className="faq-card">
              <h3>
                How can I become a
                vendor?
              </h3>

              <p>
                Click the Become a Vendor
                button and complete the
                restaurant registration
                process.
              </p>
            </div>

            <div className="faq-card">
              <h3>
                Can I create custom
                meals?
              </h3>

              <p>
                Yes. Many restaurants
                allow you to build custom
                plates directly from
                their menu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <div className="container">
          <div className="contact-cta-content">
            <h2>
              Ready To Join CampusBites?
            </h2>

            <p>
              Reach thousands of students
              and grow your restaurant.
            </p>

            <button
              onClick={() =>
                navigate("/partner")
              }
            >
              Become A Vendor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;