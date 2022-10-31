import React, { useEffect, useState } from "react";
import axios from "axios";

const MainHolder = () => {
  const [data, setData] = useState({ articles: [] });
  const [windowWidth, setWindowWidth] = useState(0);

  const changeSize = (e) => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getInfo();

    window.addEventListener("load", changeSize);
    window.addEventListener("resize", changeSize);
    return () => {
      window.addEventListener("resize", changeSize);
    };
  }, []);

  const getInfo = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/club/arsenal");
    setData(response.data);
  };

  return (
    <div id="main-site">
      <div className="d-flex justify-content-center">
        <h2 className="main-site-header font-garbled">Features</h2>
      </div>
      {/* {data.articles.length > 0 && (
        <div className="articles-container">
          {data.articles.map((article, index) => {
            console.log("article");
            return <div className={`article-${index + 1}`}></div>;
          })}
        </div> */}

      {data.articles.map((article, index) => {
        return (
          <div key={article.href} className={`row article-card  ${data.slug}`}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={article.href}
              className="col-12 col-md-6 img-container"
            >
              <img src={article.image} alt="sport" className="article-image" />
            </a>
            <div className="col-12 col-md-6 p-0 d-flex flex-column article-text-container">
              <p
                className="article-text-header font-garbled"
                id={`paragraph-${index}`}
              >
                {article.articleHeader}
              </p>
              {windowWidth >= 968 && (
                <p className="article-text">
                  {article.articleAbout.slice(0, 80)}...
                </p>
              )}
            </div>
          </div>
        );
      })}
      {/* )} */}
    </div>
  );
};

export default MainHolder;
