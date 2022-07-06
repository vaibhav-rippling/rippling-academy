import React, { useEffect, useState } from "react";
import VideoEntity from "./VideoEntity";
import "./VideoList.css";
import * as constants from "./constants.js";

let prevSearch = null;

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

function VideoList(props) {
  const initValue = apiData === null ? [] : apiData["items"];
  const [data, setData] = useState(initValue);
  const [loading, setLoading] = useState(true);

  const updateVideoList = () => {
    const newValue = apiData === null ? [] : apiData["items"];
    setData(newValue);
    setLoading(false);
  };

  useEffect(() => {
    if (prevSearch !== props.searchTerm) {
      setLoading(true);
      if (props.searchTerm === "") {
        prevSearch = "";
        fetchYoutubeData(
          constants.trendingVideosEndpoint.replace(
            "{apiKey}",
            constants.apiKey
          ),
          updateVideoList
        );
      } else {
        let searchTerm = props.searchTerm;
        prevSearch = searchTerm;
        fetchYoutubeData(
          constants.searchQueryEndpoint
            .replace("{searchTerm}", searchTerm)
            .replace("{apiKey}", constants.apiKey),
          updateVideoList
        );
      }
    } else {
      setLoading(false);
    }
  });

  if (loading) {
    return <div className="loader"></div>;
  }

  if (props.searchTerm === "") {
    return (
      <React.Fragment>
        {data.map((video) => (
          <VideoEntity key={video["id"]} id={video["id"]} video={video} />
        ))}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {data.map((video) => (
          <VideoEntity
            key={video["id"]["videoId"]}
            id={video["id"]["videoId"]}
            video={video}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default VideoList;
