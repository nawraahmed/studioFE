import React from "react"
import { Link } from "react-router-dom"
import Protofolio from "./Protofolio"
import { useTranslation } from "react-i18next"
import "../static/home.css"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home">
      <div className="top-section">
        <div className="text-content">
          <p className="home-p">
            {t("professional_branding_services")}
            <br />
            {t("business_stand_out")}
            <br />
            {t("explore_our_work")}
          </p>

          <button className="book-session-btn">{t("book_a_session")}</button>

          <div className="separator">
            <span>_________________{t("or")}_________________</span>
          </div>

          <Link to="/portfolio-list" className="portfolio-link">
            {t("view_our_portfolio")}{" "}
          </Link>
        </div>

        <img
          src="https://i.pinimg.com/736x/82/fc/35/82fc3581d01d79e05be9a82f4bab6898.jpg" // Replace with your actual image path
          alt="Decorative or branding"
          className="right-image"
        />
      </div>

      <h1 className="featured-title">{t("featured_projects")}</h1>
      <Protofolio />
    </div>
  )
}

export default Home
