import { useTranslation } from "react-i18next"

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#about">{t("footer.about")}</a>
        <a href="#contact">{t("footer.contact")}</a>
        <a href="#policy">{t("footer.policy")}</a>
      </div>
      <div className="footer-info">{t("footer.info")}</div>
    </footer>
  )
}

export default Footer
