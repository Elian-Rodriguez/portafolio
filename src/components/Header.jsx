import backgroundVideo from "../assets/video.mp4";
import profileImage from "../assets/image.png";
import './Header.css'
function Header() {
  return (
    <header className="header">
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
    </div>
    <div className="profile-image">
      <img src={profileImage} alt="Profile" />
    </div>
    <div className="text-wrapper">
      <h1>Elian Rodriguez</h1>
      <p>Desarrollador backend Python</p>
    </div>
  </header>
  );
}
export default Header;