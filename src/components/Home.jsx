import React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Protofolio from "./Protofolio"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="home">
      <Link to="/portfolio-list" className="portfolio-link">
        {t("view_our_portfolio")}
      </Link>
      <h1> {t("featured_projects")}</h1>
      <Protofolio />
    </div>
  )
}

export default Home
