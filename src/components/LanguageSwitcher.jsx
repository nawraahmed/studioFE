import React from "react"
import { useTranslation } from "react-i18next"

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
  }

  return (
    <button onClick={toggleLanguage}>
      {i18n.language === "en" ? "عربي" : "English"}
    </button>
  )
}

export default LanguageSwitcher
