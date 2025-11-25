class SpotifyAPI {
  constructor() {
    this.baseURL = 'https://api.spotify.com/v1';
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  async makeRequest(endpoint) {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getFeaturedPlaylists(limit = 20) {
    const result = await this.makeRequest(`/search?q=playlist&type=playlist&limit=${limit}`);
    return { playlists: { items: result.playlists?.items || [] } };
  }

  async getNewReleases(limit = 20) {
    const result = await this.makeRequest(`/search?q=album&type=album&limit=${limit}`);
    return { albums: { items: result.albums?.items || [] } };
  }

  async getPopularArtists(limit = 20) {
    const result = await this.makeRequest(`/search?q=artist&type=artist&limit=${limit}`);
    return { artists: { items: result.artists?.items || [] } };
  }
  
  async getPopularTracks(limit = 20) {
    const result = await this.makeRequest(`/search?q=track&type=track&limit=${limit}`);
    return { tracks: { items: result.tracks?.items || [] } };
  }

  async searchArtists(query, limit = 10) {
    if (!query) return { artists: { items: [] } };
    const result = await this.makeRequest(`/search?q=${encodeURIComponent(query)}*&type=artist&limit=${limit}`);
    return { artists: { items: result.artists?.items || [] } };
  }

  	async searchTracks(query, limit = 10) {
    	if (!query) return { tracks: { items: [] } };
    	const result = await this.makeRequest(`/search?q=${encodeURIComponent(query)}*&type=track&limit=${limit}`);
    	return { tracks: { items: result.tracks?.items || [] } };
  	}

  async getArtistTopTracks(artistId) {
    const result = await this.makeRequest(`/artists/${artistId}/top-tracks?market=US`);
    return { tracks: result.tracks || [] };
  }

  async getArtistAlbums(artistId, limit = 10) {
    const result = await this.makeRequest(`/artists/${artistId}/albums?limit=${limit}&include_groups=album,single`);
    return { albums: { items: result.items || [] } };
  }
}

export default new SpotifyAPI();