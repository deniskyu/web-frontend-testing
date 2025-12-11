import { useContext } from "react";
import { Context } from "../../context/Context";
import './CookieBanner.css'
import { NavLink } from "react-router-dom";

export default function CookieBanner() {
  const { cookieConsent, setCookieConsent } = useContext(Context);

  if (cookieConsent === "accepted" || cookieConsent === "rejected") return null;

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setCookieConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setCookieConsent("rejected");
  };

  return (
    <div className="cookie-banner">
      <p>
      Folosim cookie-uri pentru a vă îmbunătăți experiența și pentru a analiza utilizarea site-ului.
      Citiți politica noastră <NavLink to='/info#cookie' target="_blank" style={{ color: "#fff", textDecoration: "underline" }}>Privacy Policy</NavLink>.
      </p>
      <div>
        <button className="cookie-banner-accept" onClick={handleAccept}>Accepta</button>
        <button className="cookie-banner-reject" onClick={handleReject} style={{ marginLeft: "10px" }}>Reject</button>
      </div>
    </div>
  );
}
