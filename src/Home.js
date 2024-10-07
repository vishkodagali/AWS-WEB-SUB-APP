
import React, { useState, useEffect } from "react";
import "./Home.css";
import './aws-config';
import AWS from 'aws-sdk';
function Home() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [artist, setArtist] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshSubscriptions, setRefreshSubscriptions] = useState(false);
  const [subscribedSongs, setSubscribedSongs] = useState([]);
  const [artistImages, setArtistImages] = useState({});
 
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userLoggedIn"));
    if (userData && userData.email) {
      fetchSubscribedSongs(userData.email);
      fetchImagesFromS3();
    }
  }, [refreshSubscriptions]);

  const fetchImagesFromS3 = async () => {
    try {
      const s3 = new AWS.S3();
      const response = await s3.listObjectsV2({
        Bucket: '9900430217',
        Prefix: ''
      }).promise();
      const imageMap = {};
      response.Contents.forEach(obj => {
        const keyBase = obj.Key.match(/(.*)\.[^.]+$/)[1];
        imageMap[keyBase.replace('_', ' ').toLowerCase()] = `https://9900430217.s3.amazonaws.com/${obj.Key}`;
      });
      setArtistImages(imageMap);
    } catch (err) {
      console.error("Error fetching from S3", err);
      // setError("Failed to load images from S3.");
    }
  };
  
  const fetchSubscribedSongs = async (email) => {
    setLoading(true);
    try {
      const response = await fetch("https://o904quqho1.execute-api.us-east-1.amazonaws.com/dissent/retirve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        throw new Error(jsonResponse.message || "Failed to fetch subscribed songs");
      }
      const data = jsonResponse.body ? JSON.parse(jsonResponse.body).map(song => ({
        title: song.title || 'Unknown Title',
        artist: song.artist || 'Unknown Artist',
        year: song.year || 'Unknown Year',
        img_url: song.img_url || 'default_image_url_here'
      })) : [];
      setSubscribedSongs(data);
    } catch (err) {
     
      setError(`No Music Subscribed`)
      setSubscribedSongs([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleQuery = async () => {
    setLoading(true);
    setError("");
    setResults([]); 
    const query = {
      title: title.trim().toLowerCase(),
      year: year.trim(),
      artist: artist.trim().toLowerCase(),
    };
    localStorage.setItem("lastSearch", JSON.stringify(query));
    try {
      const response = await fetch(
        "https://rtlur19mbl.execute-api.us-east-1.amazonaws.com/search/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        }
      );
      const jsonResponse = await response.json();
      if (!response.ok) {
        throw new Error(jsonResponse.message || "Network response was not ok");
      }
      const data = JSON.parse(jsonResponse.body);
      if (data && Array.isArray(data)) {
        setResults(data);
      } else if (
        data.message &&
        data.message.includes("No result is retrieved. Please query again")
      ) {
        setError("No records found");
      } else {
        setError("No result is retrieved. Please query again");
        setResults([]);
      }
    } catch (err) {
      setError(`Failed to fetch: ${err.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  const handleSubscribe = async (item, subscribe = true) => {
    const userData = JSON.parse(localStorage.getItem("userLoggedIn"));
    if (userData && userData.email) {
      const subscriptionData = {
        email: userData.email,
        title: item.title,
        artist: item.artist,
        year: item.year,
        img_url: item.img_url,
        assent: subscribe ? "assent" : "dissent",
      };
      localStorage.setItem("subscribedMusic", JSON.stringify(subscriptionData));
      try {
        const response = await fetch(
          "https://0n973vwwy4.execute-api.us-east-1.amazonaws.com/subscription/assent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subscriptionData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert(data.message || JSON.parse(data.body).message);
          setRefreshSubscriptions(prev => !prev);
          if (subscribe) {
            setSubscribedSongs((prevSongs) => [...prevSongs, item]);
          } else {
            setSubscribedSongs((prevSongs) => 
              prevSongs.filter((song) => song.title !== item.title || song.artist !== item.artist || song.year !== item.year)
            );
          }
        } else {
          throw new Error(data.message || JSON.parse(data.body).message);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("User not logged in or email not found.");
    }
  };


  return (
    <div className="Home-page">
      <div className="query-area">
        <h2>Query</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button onClick={handleQuery}>Query</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <img
                className="song-image"
                src={artistImages[item.artist?.toLowerCase() || ''] || item.img_url}
                alt={item.artist || "Unknown Artist"}
              />
              <div className="song-details">
                <h3>{item.title}</h3>
                <p>Artist: {item.artist}</p>
                <p>Year: {item.year}</p>
                <button onClick={() => handleSubscribe(item, true)}>Subscribe</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="Subscription-area">
        <h2>Subscribed Songs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {Array.isArray(subscribedSongs) ? (
              subscribedSongs.map((song, index) => (
                <li key={index}>
                  <img
                    className="song-image"
                    src={artistImages[song.artist.toLowerCase()] || song.img_url}
                    alt={song.artist}
                  />
                  <div className="song">
                    <h3>{song.title}</h3>
                    <p>Artist: {song.artist}</p>
                    <p>Year: {song.year}</p>
                    <button onClick={() => handleSubscribe(song, false)}>Unsubscribe</button>
                  </div>
                </li>
              ))
            ) : (
              <p>No subscribed songs to display</p>
            )}
          </ul>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
export default Home;
