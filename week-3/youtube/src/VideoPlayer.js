import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as constants from "./constants.js";
import "./VideoPlayer.css";

let prevId = null;

let apiData = null;

const fetchYoutubeData = (endpoint, callback) => {
  console.log(endpoint);
  fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then(
      (json) => {
        console.log("RESPONSE FROM BACKEND", json);
        apiData = json;
        callback();
      },
      (error) => {
        console.log("ERROR FROM THE BACKEND", error);
      }
    );
};

function VideoPlayer() {
  const { id } = useParams();

  const src = `https://www.youtube.com/embed/${id}?autoplay=1`;

  const initValue = apiData === null ? [] : apiData["items"][0];
  const [data, setData] = useState(initValue);
  const [loading, setLoading] = useState(true);

  const updateVideoDetails = () => {
    const newValue = apiData === null ? [] : apiData["items"][0];
    setData(newValue);
    setLoading(false);
  };

  useEffect(() => {
    if (prevId !== id) {
      setLoading(true);

      prevId = id;
      fetchYoutubeData(
        constants.searchVideoByIdEndpoint
          .replace("{videoId}", id)
          .replace("{apiKey}", constants.apiKey),
        updateVideoDetails
      );
    } else {
      setLoading(false);
    }
  });

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="videoplayer_container">
      <div className="video_container">
        <iframe
          width="1003"
          height="564"
          src={src}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="video"
        />
      </div>
      <div className="video_details">
        <p className="video-title">{data["snippet"]["title"]}</p>
        <p className="video-channel">{data["snippet"]["channelTitle"]}</p>
        <p className="video-description">{data["snippet"]["description"]}</p>
      </div>
    </div>
  );
}

export default VideoPlayer;
