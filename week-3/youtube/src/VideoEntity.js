import { Link } from "react-router-dom";
import "./VideoEntity.css";

function VideoEntity(props) {
  const id = props.id;
  const snippet = props.video["snippet"];
  const src = snippet["thumbnails"]["high"]["url"];
  const url = `/video/${id}`;

  return (
    <Link to={url} style={{ textDecoration: "none", color: "black" }}>
      <div className="container">
        <div className="img-div">
          <img src={src}></img>
        </div>
        <div className="text-div">
          <p className="title">{snippet["title"]}</p>
          <p className="channel">{snippet["channelTitle"]}</p>
          <p className="description">{snippet["description"]}</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoEntity;
