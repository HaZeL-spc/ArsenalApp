import React, { useEffect, useState } from "react";

const Nav = () => {
  const [mdNavbar, setMDNavbar] = useState();
  const [firstLoad, setFirstLoad] = useState(true);

  const activateNav = () => {
    const navbarSite = document.querySelector(".navbar-site");
    const logo = document.querySelector(".navbar-logo");
    const width = logo.clientWidth;

    navbarSite.classList.toggle("change");

    if (navbarSite.classList.contains("change")) {
      logo.style.marginLeft = `calc(50% - ${width / 2}px)`;
    } else {
      logo.style.marginLeft = 0;
    }
  };

  const changeTypeNav = () => {
    const nav = document.querySelector(".navbar-site");
    if (window.innerWidth >= 600) {
      nav.style.backgroundColor = "transparent";
      setMDNavbar(true);
    } else {
      nav.style.backgroundColor = "black";
      nav.classList.add("scrolled");
      nav.classList.remove("unscrolled");
      setMDNavbar(false);
    }
  };

  const changeColorNav = (e) => {
    const stadium = document.querySelector(".arsenal-stadium-bg");
    const scrolledNav = document.querySelector(".scrolled-nav");
    const nav = document.querySelector(".navbar-site");

    const stadiumOptions = {
      threshold: 1,
    };

    const stadiumObserver = new IntersectionObserver(function (
      entries,
      stadiumObserver
    ) {
      console.log(mdNavbar);
      // setFirstLoad(false);
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          nav.classList.add("scrolled");
          nav.classList.remove("unscrolled");
          scrolledNav.style.height = "70px";
        }
      });
    },
    stadiumOptions);

    stadiumObserver.observe(stadium);
  };

  useEffect(() => {
    if (mdNavbar) {
      changeColorNav();
    }
    changeTypeNav();
    window.addEventListener("resize", changeTypeNav);

    return () => {
      window.removeEventListener("resize", changeTypeNav);
    };
  }, [mdNavbar]);

  if (mdNavbar) {
    return (
      <div
        className={`navbar-site page-navbar-md font-garbled ${
          firstLoad ? "unscrolled" : "scrolled"
        }`}
      >
        <div className="scrolled-nav"></div>
        <div className="page-navbar-holder-md">
          <div className="navbar-logo">
            <h2 className="logo-text">logo</h2>
          </div>
          <ul className="navbar-menu-md">
            <li>
              <a href="#header-page" class="a-nav-element">
                Menu
              </a>
            </li>
            <li>
              <a href="#main-site" class="a-nav-element">
                Latest
              </a>
            </li>
            <li>
              <a href="#score-container" class="a-nav-element">
                Table
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar-site page-navbar font-garbled scrolled">
        <div className="page-navbar-holder">
          <div className="navbar-logo">
            <h2 className="logo-text">logo</h2>
          </div>
          <div className="navbar-menu">
            <div className="bar-container" onClick={activateNav}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </div>
        <div className="falling-nav">
          <ul>
            <li className="border-bottom" onClick={activateNav}>
              <a href="#header-page" className="a-nav-element">
                Menu
              </a>
            </li>
            <li className="border-bottom" onClick={activateNav}>
              <a href="#main-site" className="a-nav-element">
                Latest
              </a>
            </li>
            <li onClick={activateNav}>
              <a href="#score-container " className="a-nav-element">
                Table
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

export default Nav;
