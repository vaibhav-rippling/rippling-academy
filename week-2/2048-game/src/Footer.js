import "./Footer.css";

function Footer(props) {
  return (
    <div className="container">
      <div className="Footer">
        <p>
          <strong>HOW TO PLAY:</strong> Use your <strong>arrow keys</strong> to
          move the tiles. When two tiles with the same number touch, they{" "}
          <strong>merge into one!</strong>
        </p>
      </div>
    </div>
  );
}

export default Footer;
