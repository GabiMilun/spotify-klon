import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import spotifyStore from '../stores/spotifyStore';

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

  return (
    <div className="trending">
      {/* Featured Playlists */}
      <section className="trending-section">
        <h2>Featured Playlists</h2>
        <div className="content-grid">
          {spotifyStore.featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="content-card">
              <img
                src={playlist.images?.[0]?.url || '/placeholder.png'}
                alt={playlist.name}
                className="card-image"
              />
              <div className="card-info">
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="trending-section">
        <h2>New Releases</h2>
        <div className="content-grid">
          {spotifyStore.newReleases.map((album) => (
            <div key={album.id} className="content-card">
              <img
                src={album.images?.[0]?.url || '/placeholder.png'}
                alt={album.name}
                className="card-image"
              />
              <div className="card-info">
                <h3>{album.name}</h3>
                <p>{album.artists?.map(artist => artist.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="trending-section">
        <h2>Browse Categories</h2>
        <div className="content-grid">
          {spotifyStore.categories.map((category) => (
            <div key={category.id} className="content-card category-card">
              <img
                src={category.icons?.[0]?.url || '/placeholder.png'}
                alt={category.name}
                className="card-image"
              />
              <div className="card-info">
                <h3>{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

export default Trending;