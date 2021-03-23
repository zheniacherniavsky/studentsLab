import rockstarLogo from "@/assets/images/rockstarGamesLogo.svg";
import epicgamesLogo from "@/assets/images/epicGamesLogo.svg";
import riotGamesLogo from "@/assets/images/riotGames.svg";

import "@/Components/footer.scss";

function Footer() {
  return (
    <div className="footer_container">
      <p className="footer_container__label">Incredible convenient</p>
      <div className="footer_container__info">
        <div className="footer_container__info__contacts">
          <p>Yauheni.Charniauski@itechart-group.com</p>
          <p>Students Labs iTechArt 2021</p>
        </div>

        <div className="footer_container__info__icons">
          <a href="https://www.rockstargames.com">
            <img src={rockstarLogo} alt="rockstar games" />
          </a>
          <a href="https://www.epicgames.com/">
            <img src={epicgamesLogo} alt="epicgames" />
          </a>
          <a href="https://www.riotgames.com/en">
            <img src={riotGamesLogo} alt="riotgames" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
