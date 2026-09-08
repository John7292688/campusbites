import { useNavigate } from "react-router-dom";

function Partner() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: "#f8fafc",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#fff7f0,#fff)",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(400px,1fr))",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <div>
            <span
              style={{
                background: "#ff6b00",
                color: "#fff",
                padding: "8px 14px",
                borderRadius: "30px",
                fontSize: "14px",
              }}
            >
              Restaurant Partner Program
            </span>

            <h1
              style={{
                fontSize: "3.5rem",
                marginTop: "20px",
                marginBottom: "20px",
                lineHeight: "1.1",
              }}
            >
              Grow Your Restaurant
              <br />
              with CampusBites
            </h1>

            <p
              style={{
                fontSize: "1.2rem",
                color: "#666",
                marginBottom: "30px",
              }}
            >
              Reach thousands of students,
              receive online orders,
              manage your menu easily,
              and grow your revenue from
              one dashboard.
            </p>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() =>
                  navigate("/owner/register")
                }
                style={{
                  background: "#ff6b00",
                  color: "#fff",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Start Selling Today
              </button>

              <button
                onClick={() =>
                  navigate("/owner/login")
                }
                style={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Owner Login
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200"
              alt="Restaurant"
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "-40px auto 70px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          padding: "0 20px",
        }}
      >
        {[
          ["5,000+", "Students"],
          ["100+", "Orders Weekly"],
          ["20+", "Restaurants"],
          ["24/7", "Platform Access"],
        ].map(([number, text]) => (
          <div
            key={text}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.05)",
            }}
          >
            <h2>{number}</h2>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* BENEFITS */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Why Partner With CampusBites?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
          }}
        >
          {[
            {
              title: "More Orders",
              icon: "🍔",
              text: "Reach students across campus and receive more orders every day.",
            },
            {
              title: "More Revenue",
              icon: "📈",
              text: "Increase sales and grow your customer base effortlessly.",
            },
            {
              title: "Easy Management",
              icon: "⚙️",
              text: "Manage menu items, packages and orders from one dashboard.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "20px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.05)",
              }}
            >
              <h3>
                {item.icon} {item.title}
              </h3>

              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Features */}

<div
  style={{
    maxWidth: "1200px",
    margin: "100px auto",
    padding: "0 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "50px",
    }}
  >
    Everything You Need To Manage Your Restaurant
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "25px",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h3>📋 Menu Management</h3>
      <p>
        Add, edit and organize your food
        items easily.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h3>🛒 Order Tracking</h3>
      <p>
        Receive and manage incoming orders
        in real time.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h3>📦 Package Listings</h3>
      <p>
        Promote meal packages and special
        offers.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h3>📊 Sales Insights</h3>
      <p>
        Track restaurant performance and
        growth.
      </p>
    </div>
  </div>
</div>

      {/* HOW IT WORKS */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "100px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {[
            "Create Your Account",
            "Register Your Restaurant",
            "Start Receiving Orders",
          ].map((step, index) => (
            <div
              key={step}
              style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#ff6b00",
                  color: "#fff",
                  borderRadius: "50%",
                  margin: "0 auto 20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </div>

              <h3>{step}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}

<div
  style={{
    background: "#fff",
    padding: "80px 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "50px",
    }}
  >
    What Restaurant Owners Say
  </h2>

  <div
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "25px",
    }}
  >
    <div
      style={{
        background: "#f8fafc",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      ⭐⭐⭐⭐⭐

      <p>
        CampusBites helped us reach more
        students and increase our daily
        orders.
      </p>

      <strong>Food Palace</strong>
    </div>

    <div
      style={{
        background: "#f8fafc",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      ⭐⭐⭐⭐⭐

      <p>
        Managing orders has become much
        easier with the owner dashboard.
      </p>

      <strong>Tasty Kitchen</strong>
    </div>

    <div
      style={{
        background: "#f8fafc",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      ⭐⭐⭐⭐⭐

      <p>
        The platform brought us new
        customers every week.
      </p>

      <strong>Campus Grill</strong>
    </div>
  </div>
</div>

{/* FAQ */}

<div
  style={{
    maxWidth: "900px",
    margin: "100px auto",
    padding: "0 20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "50px",
    }}
  >
    Frequently Asked Questions
  </h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h3>
        How much does it cost to join?
      </h3>

      <p>
        Creating a restaurant account is
        completely free.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h3>
        How do I receive orders?
      </h3>

      <p>
        Orders are sent directly to your
        restaurant dashboard in real time.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h3>
        Can I update my menu anytime?
      </h3>

      <p>
        Yes. You can add, edit, remove,
        and organize menu items whenever
        you want.
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h3>
        How long does approval take?
      </h3>

      <p>
        Most restaurant accounts are
        reviewed and approved within
        a short period after submission.
      </p>
    </div>
  </div>
</div>

      {/* CTA */}
      <div
        style={{
          padding: "100px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background:
              "linear-gradient(135deg,#ff6b00,#ff8a33)",
            borderRadius: "25px",
            padding: "60px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2>
            Ready To Start Selling On
            CampusBites?
          </h2>

          <p
            style={{
              margin: "20px 0 30px",
            }}
          >
            Create your restaurant account
            today and start receiving orders.
          </p>

          <button
            onClick={() =>
              navigate("/owner/register")
            }
            style={{
              background: "#fff",
              color: "#ff6b00",
              border: "none",
              padding: "15px 30px",
              borderRadius: "12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Create Owner Account
          </button>
        </div>
      </div>
    </section>
  );
}

export default Partner;