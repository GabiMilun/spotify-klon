import './Trending.scss'
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import spotifyStore from '../stores/spotifyStore';
import fallbackImage from '../assets/pas.jpeg';

const Trending = observer(() => {
  useEffect(() => {
    spotifyStore.fetchTrendingData();
  }, []);

  if (spotifyStore.loading) {
    return (
      <div className="trending">
        <div className="loading">Loading trending content...</div>
      </div>
    );
  }

  if (spotifyStore.error) {
    return (
      <div className="trending">
        <div className="error">{spotifyStore.error}</div>
      </div>
    );
  }

  const renderTracks = () => {
    return spotifyStore.trendingSongs.slice(0, 20).map(track => {
    const artwork = track.album?.images?.[0]?.url || fallbackImage;
    const artists = track.artists?.map(artist => artist.name).join(', ');
    return (
        <div key={track.id} className="media-card">
            <div className="media-thumb">
                <img src={artwork} alt={track.name} />
            </div>
            <div className="media-meta">
                <h3>{track.name}</h3>
                <p>{artists}</p>
            </div>
        </div>
      );
    });
  };

  const renderArtists = () => {
    return spotifyStore.popularArtists.slice(0, 20).map(artist => {
    const artwork = artist.images?.[0]?.url || fallbackImage;
      return (
        <div key={artist.id} className="media-card">
            <div className="media-thumb artist">
                <img src={artwork} alt={artist.name} />
            </div>
            <div className="media-meta">
                <h3>{artist.name}</h3>
                <p>Artist</p>
            </div>
        </div>
      );
    });
  };

  const renderAlbums = () => {
    return spotifyStore.popularAlbums.slice(0, 20).map(album => {
    const artwork = album.images?.[0]?.url || fallbackImage;
    const artists = album.artists?.map(artist => artist.name).join(', ');
    return (
        <div key={album.id} className="media-card">
            <div className="media-thumb">
                <img src={artwork} alt={album.name} />
            </div>
            <div className="media-meta">
                <h3>{album.name}</h3>
                <p>{artists}</p>
            </div>
        </div>
      );
    });
  };

  return (
    <div className="trending">
      <section className="trending-section">
        <div className="section-header">
          <h2>Trending Songs</h2>
          <Link to="/section/trending-songs">Show all</Link>
        </div>
        <div className="card-row">
          {renderTracks()}
        </div>
      </section>

      <section className="trending-section">
        <div className="section-header">
          <h2>Popular Artists</h2>
          <Link to="/section/popular-artists">Show all</Link>
        </div>
        <div className="card-row">
          {renderArtists()}
        </div>
      </section>

      <section className="trending-section">
        <div className="section-header">
          <h2>Popular Albums & Singles</h2>
          <Link to="/section/popular-albums">Show all</Link>
        </div>
        <div className="card-row">
          {renderAlbums()}
        </div>
      </section>
    </div>
  );
});

export default Trending;