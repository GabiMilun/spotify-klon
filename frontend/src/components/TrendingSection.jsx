import './Trending.scss';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import spotifyStore from '../stores/spotifyStore';
import fallbackImage from '../assets/pas.jpeg';

const SECTION_CONFIG = {
  'trending-songs': {
    title: 'Trending Songs',
    selector: store => store.trendingSongs,
    getImage: item => item.album?.images?.[0]?.url || fallbackImage,
    getTitle: item => item.name,
    getSubtitle: item => item.artists?.map(artist => artist.name).join(', ') || 'Unknown artist',
    thumbShape: 'square'
  },
  'popular-artists': {
    title: 'Popular Artists',
    selector: store => store.popularArtists,
    getImage: item => item.images?.[0]?.url || fallbackImage,
    getTitle: item => item.name,
    getSubtitle: () => 'Artist',
    thumbShape: 'circle'
  },
  'popular-albums': {
    title: 'Popular Albums & Singles',
    selector: store => store.popularAlbums,
    getImage: item => item.images?.[0]?.url || fallbackImage,
    getTitle: item => item.name,
    getSubtitle: item => item.artists?.map(artist => artist.name).join(', ') || 'Various artists',
    thumbShape: 'square'
  }
};

const TrendingSection = observer(() => {
  const { sectionId } = useParams();
  const config = SECTION_CONFIG[sectionId];

  useEffect(() => {
    spotifyStore.fetchTrendingData();
  }, []);

  const items = config ? config.selector(spotifyStore).slice(0, 20) : [];

  if (!config) {
    return (
      <div className="trending-full">
        <div className="error">Section not found.</div>
      </div>
    );
  }

  if (spotifyStore.loading && items.length === 0) {
    return (
      <div className="trending-full">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (spotifyStore.error) {
    return (
      <div className="trending-full">
        <div className="error">{spotifyStore.error}</div>
      </div>
    );
  }

  return (
    <div className="trending-full">
      <div className="section-header">
        <h2>{config.title}</h2>
        <Link to="/">Back</Link>
      </div>
      <div className="card-grid">
        {items.map(item => (
          <div key={item.id} className="media-card">
            <div className={`media-thumb ${config.thumbShape === 'circle' ? 'artist' : ''}`}>
              <img src={config.getImage(item)} alt={config.getTitle(item)} />
            </div>
            <div className="media-meta">
              <h3>{config.getTitle(item)}</h3>
              <p>{config.getSubtitle(item)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TrendingSection;
