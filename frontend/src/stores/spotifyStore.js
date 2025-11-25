import { makeObservable, observable, action } from 'mobx';
import spotifyAPI from '../services/spotifyAPI';

class SpotifyStore {
  trendingSongs = [];
  popularArtists = [];
  popularAlbums = [];
  searchResults = [];
  topResultTrack = null;
  trackSearchResults = [];
  artistAlbums = [];
  loading = false;
  error = null;

  constructor() {
    makeObservable(this, {
      trendingSongs: observable,
      popularArtists: observable,
      popularAlbums: observable,
      searchResults: observable,
      topResultTrack: observable,
      trackSearchResults: observable,
      artistAlbums: observable,
      loading: observable,
      error: observable,
      fetchTrendingData: action,
      search: action,
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

  async fetchTrendingData(force = false) {
    if (!force && this.trendingSongs.length && this.popularArtists.length && this.popularAlbums.length) {
      return;
    }
    try {
      this.setLoading(true);
      this.setError(null);

      const [tracksData, artistsData, albumsData] = await Promise.all([
        spotifyAPI.getPopularTracks(20),
        spotifyAPI.getPopularArtists(20),
        spotifyAPI.getNewReleases(20)
      ]);

      this.trendingSongs = tracksData.tracks?.items || [];
      this.popularArtists = artistsData.artists?.items || [];
      this.popularAlbums = albumsData.albums?.items || [];

    } catch (err) {
      console.error('Error fetching trending data:', err);
      this.setError('Failed to load trending data. Please check your Spotify API credentials.');
    } finally {
      this.setLoading(false);
    }
    } 

  async search(query) {
    try {
    	this.setLoading(true);
      	this.setError(null);
      
      	this.topResultTrack = null;
      	this.trackSearchResults = [];
      	this.artistAlbums = [];
      	this.searchResults = [];

      	const [artistsData, tracksData] = await Promise.all([
        	spotifyAPI.searchArtists(query, 4),
        	spotifyAPI.searchTracks(query, 5)
      	]);

      	this.searchResults = artistsData.artists?.items || [];
      	const tracks = tracksData.tracks?.items || [];
      
      	if (tracks.length > 0) {
        	this.topResultTrack = tracks[0];
        	this.trackSearchResults = tracks.slice(1, 5);
      	}

      	if (this.searchResults.length > 0) {
        	const bestArtist = this.searchResults[0];
        	const albumsData = await spotifyAPI.getArtistAlbums(bestArtist.id, 4);
        	this.artistAlbums = albumsData.albums?.items || [];
      	}

    	} catch (err) {
      		console.error("Search error:", err);
      		this.setError("Failed to search artists");
    	} finally {
      		this.setLoading(false);
    	}
  	} 
}

export default new SpotifyStore();