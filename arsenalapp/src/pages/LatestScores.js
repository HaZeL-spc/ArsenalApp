import React, { useEffect, useState } from "react";
import axios from "axios";

const largeSize = 1200;
const mediumSize = 992;
const smallSize = 768;
const extraSmallSize = 599;

const LatestScores = () => {
  const [tableData, setTableData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  const changeSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getInfo();
    window.onload = changeSize;
    window.addEventListener("resize", changeSize);
    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, []);

  const getInfo = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/league_table");

    console.log(response.data);
    setTableData(response.data);
  };

  return (
    <div className="scores-container" id="score-container">
      {tableData.length > 0 && (
        <div className="table-container p-5">
          <table className="premier-table">
            <thead>
              <tr className="headers">
                <th className="place-header">Pos</th>
                <th className="club-header">Club</th>
                <th className="club-2-header"></th>
                <th className="club-2-header">Played</th>
                {windowWidth > extraSmallSize && (
                  <th className="club-2-header">Won</th>
                )}
                {windowWidth > 700 && <th className="club-2-header">Drawn</th>}
                {windowWidth > extraSmallSize && (
                  <th className="club-2-header">Lost</th>
                )}
                {windowWidth > mediumSize && (
                  <th className="club-2-header">GF</th>
                )}
                {windowWidth > mediumSize && (
                  <th className="club-2-header">GA</th>
                )}
                {windowWidth > mediumSize && (
                  <th className="club-2-header">GD</th>
                )}
                <th className="points-header">Pts</th>
                {windowWidth > largeSize && (
                  <th colSpan="5" className="text-center">
                    Form
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.map((club) => (
                <tr
                  key={club.place}
                  className={`info-container ${
                    club.long_name.toLowerCase() === "arsenal"
                      ? "highlight"
                      : ""
                  }`}
                >
                  <td className="info-table">{club.place}</td>
                  <td className="info-table-image">
                    <img src={`${club.image_href}`} alt="club" />
                  </td>
                  <td className="info-table club_name">
                    {windowWidth <= 800 ? club.short_name : club.long_name}
                  </td>
                  <td className="info-table">{club.played}</td>
                  {windowWidth > extraSmallSize && (
                    <td className="info-table">{club.won}</td>
                  )}
                  {windowWidth > 700 && (
                    <td className="info-table">{club.draw}</td>
                  )}
                  {windowWidth > extraSmallSize && (
                    <td className="info-table">{club.lost}</td>
                  )}
                  {windowWidth > mediumSize && (
                    <td className="info-table">{club.goalsFor}</td>
                  )}
                  {windowWidth > mediumSize && (
                    <td className="info-table">{club.goalsAgainst}</td>
                  )}
                  {windowWidth > mediumSize && (
                    <td className="info-table">
                      {club.goalsFor - club.goalsAgainst >= 0 ? "+" : ""}
                      {club.goalsFor - club.goalsAgainst}
                    </td>
                  )}

                  <td className="info-table">
                    <strong>{club.points}</strong>
                  </td>
                  {windowWidth > largeSize && (
                    <td className="form-container hideMedium">
                      {club.form.map((score, index) => (
                        <li key={index} className={score}>
                          {score[0].toUpperCase()}
                        </li>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestScores;
