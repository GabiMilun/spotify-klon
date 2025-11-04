import { makeObservable, observable, action } from 'mobx';
import spotifyAPI from '../services/spotifyAPI';

class SpotifyStore {
  featuredPlaylists = [];
  newReleases = [];
  categories = [];
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      featuredPlaylists: observable,
      newReleases: observable,
      categories: observable,
      loading: observable,
      error: observable,
      fetchTrendingData: action,
      setLoading: action,
      setError: action
    });
  }

  setLoading(loading) {
    this.loading = loading;
  }

  setError(error) {
    this.error = error;
  }

  async fetchTrendingData() {
    try {
      this.setLoading(true);
      this.setError(null);

      const [playlistsData, releasesData, categoriesData] = await Promise.all([
        spotifyAPI.getFeaturedPlaylists(10),
        spotifyAPI.getNewReleases(10),
        spotifyAPI.getCategories(10)
      ]);

      this.featuredPlaylists = playlistsData.playlists?.items || [];
      this.newReleases = releasesData.albums?.items || [];
      this.categories = categoriesData.categories?.items || [];

    } catch (err) {
      console.error('Error fetching trending data:', err);
      this.setError('Failed to load trending data. Please check your Spotify API credentials.');
    } finally {
      this.setLoading(false);
    }
  }
}

export default new SpotifyStore();