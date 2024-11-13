import React from "react"
import { Link } from "react-router-dom"
import Protofolio from "./Protofolio"
import "../static/home.css"
import { useTranslation } from "react-i18next"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home">
      <p className="home-p">
        Professional branding services tailored to make your
        <br />
        business stand out. Book an appointment and
        <br />
        explore our work.
      </p>

      <button className="book-session-btn">Book A Session!</button>

      <br />

      <div className="separator">
        <span>_________________or_________________</span>
      </div>

      <br />

      <Link to="/portfolio-list" className="portfolio-link">
        {t("view_our_portfolio")}
      </Link>
      <br />
      <h1 className="featured-title"> {t("featured_projects")}</h1>
      <Protofolio />
    </div>
  )
}

export default Home
