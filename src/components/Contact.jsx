import React from "react"
import { useTranslation } from "react-i18next"

const Contact = () => {
  const { t } = useTranslation()

  return (
    <div className="contact">
      <h3>{t("contact_us")}</h3>
      <p>{t("contact_details")}</p>
    </div>
  )
}

export default Contact
