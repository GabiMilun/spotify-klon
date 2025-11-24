import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Play, Heart, DotsThree } from '@phosphor-icons/react';
import spotifyStore from '../stores/spotifyStore';
import './SearchResults.scss';

const SearchResults = observer(() => {
	const { query } = useParams();

	useEffect(() => {
		if (query) {
			spotifyStore.search(query);
		}
	}, [query]);

	if (spotifyStore.loading) {
		return <div className="search-results-loading">Loading...</div>;
	}

	if (spotifyStore.error) {
		return <div className="search-results-error">{spotifyStore.error}</div>;
	}

	const { searchResults, topResultTrack, artistTopTracks, artistAlbums } = spotifyStore;

	if (!searchResults || searchResults.length === 0) {
		return <div className="search-results-empty">No results found for "{query}"</div>;
	}

	const topArtist = searchResults[0];

	return (
		<div className="search-results">
			<div className="top-section">
				<div className="top-result-container">
					<h2>Top result</h2>
					{topResultTrack ? (
						<div className="top-result-card">
							<div className="image-wrapper">
								<img src={topResultTrack.album.images[0]?.url} alt={topResultTrack.name} />
							</div>
							<div className="info">
								<div className="track-name">{topResultTrack.name}</div>
								<div className="artist-name">
									{topResultTrack.artists.map(a => a.name).join(', ')}
									<span className="tag">Song</span>
								</div>
							</div>
							<div className="play-button">
								<Play size={24} weight="fill" />
							</div>
						</div>
					) : (
						<div className="top-result-card">
							<div className="info">
								<div className="track-name">{topArtist.name}</div>
								<div className="artist-name">Artist</div>
							</div>
						</div>
					)}
				</div>

				<div className="songs-container">
					<h2>Songs</h2>
					<div className="songs-list">
						{artistTopTracks.map((track) => (
							<div key={track.id} className="song-row">
								<div className="song-image">
									<img src={track.album.images[2]?.url || track.album.images[0]?.url} alt={track.name} />
									<div className="play-overlay">
										<Play size={16} weight="fill" color="white" />
									</div>
								</div>
								<div className="song-info">
									<div className="song-name">{track.name}</div>
									<div className="song-artist">{track.artists.map(a => a.name).join(', ')}</div>
								</div>
								<div className="song-duration">
									{Math.floor(track.duration_ms / 60000)}:{((track.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}
								</div>
								<div className="song-actions">
									<Heart size={16} />
									<DotsThree size={16} weight="bold" />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="section-container">
				<h2>Artists</h2>
				<div className="grid-container">
					{searchResults.map((artist) => (
						<div key={artist.id} className="card">
							<div className="image-container circle">
								{artist.images && artist.images.length > 0 ? (
									<img src={artist.images[0].url} alt={artist.name} />
								) : (
									<div className="placeholder-image"></div>
								)}
							</div>
							<div className="card-info">
								<h3>{artist.name}</h3>
								<p>Artist</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{artistAlbums.length > 0 && (
				<div className="section-container">
					<h2>Albums</h2>
					<div className="grid-container">
						{artistAlbums.map((album) => (
							<div key={album.id} className="card">
								<div className="image-container square">
									{album.images && album.images.length > 0 ? (
										<img src={album.images[0].url} alt={album.name} />
									) : (
										<div className="placeholder-image"></div>
									)}
								</div>
								<div className="card-info">
									<h3>{album.name}</h3>
									<p>{album.release_date.split('-')[0]} • {album.album_type}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

		</div>
	);
});

export default SearchResults;
