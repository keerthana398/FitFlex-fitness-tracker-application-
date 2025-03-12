import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use this instead of window.location.href
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to handle scrolling
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to smoothly scroll to a section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={scrollPosition > 100 || location.pathname !== "/" ? "navbar nav-scrolled" : "navbar"}
    >
      <h3 onClick={() => navigate("/")}>SB Fitzz</h3>

      {/* Check if the user is on the home page */}
      {location.pathname === "/" ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("search")}>Search</li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => navigate("/") & setTimeout(() => scrollToSection("about"), 100)}>
            About
          </li>
          <li onClick={() => navigate("/") & setTimeout(() => scrollToSection("search"), 100)}>
            Search
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
