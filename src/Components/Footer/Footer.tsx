import rockstarLogo from "@/assets/images/rockstarGamesLogo.svg";
import epicgamesLogo from "@/assets/images/epicGamesLogo.svg";
import riotGamesLogo from "@/assets/images/riotGames.svg";

import "@/style/footer.scss";

function Footer() {
  return (
    <div className="footer">
      <p className="label">Incredible convenient</p>
      <p className="email">Yauheni.Charniauski@itechart-group.com</p>

      <div className="icons">
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
  );
}

export default Footer;
