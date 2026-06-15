import { MUSIC_IDS } from "./musicIds";

// Streaming links. TEN/TEN album URLs default to the artist profile so nothing
// is ever a dead link — paste the exact album URLs here when you have them.
const APPLE_ARTIST = "https://music.apple.com/us/artist/beetrus/1486745458";
const SPOTIFY_ARTIST = MUSIC_IDS.spotifyArtistId && MUSIC_IDS.spotifyArtistId !== "PASTE_HERE"
  ? `https://open.spotify.com/artist/${MUSIC_IDS.spotifyArtistId}`
  : "https://open.spotify.com/search/Beetrus";

export const musicLinks = {
  tenTenSpotify: SPOTIFY_ARTIST,
  tenTenApple: APPLE_ARTIST,
  tenTenAudiomack: "https://audiomack.com/beetrus",
};

export interface Track {
  no: number;
  title: string;
  feat?: string;
  producer?: string;
  spotifyId?: string;   // Spotify track id, for inline embeds (open.spotify.com/embed/track/<id>)
}

export interface Release {
  id: string;
  title: string;
  subtitle?: string;
  type: string;
  year: string;
  label?: string;
  coverEmoji: string;
  coverImage?: string;       // path under /public, e.g. /music/ten-ten.jpg
  coverVideo?: string;       // optional cover-reveal video, e.g. /music/videos/ten-ten-cover-reveal.mp4
  featured?: boolean;        // headline release, rendered hero-style
  tracks?: string[];
  trackList?: Track[];       // rich tracklist with features + producers
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl?: string;
  audiomackUrl?: string;
}

export const musicData = {
  artistName: 'Beetrus',
  bio: 'Beetrus is an Abuja-based recording artist, producer, and event promoter. His sound blends Afrosounds, R&B, and Drill into a distinctly Nigerian experience — introspective, textured, and built for the late night. From his debut EP "Afro State Of Mind" to his 10-track project "TEN/TEN: The Lost Files," he has established himself as one of Abuja\'s most promising independent acts.',

  releases: [
    {
      id: 'ten-ten',
      title: 'TEN/TEN',
      subtitle: 'The Lost Files',
      type: 'Album',
      year: '2025',
      label: 'Kinfxlk Records',
      coverEmoji: '🔟',
      coverImage: '/music/ten-ten.jpg',
      coverVideo: '/music/videos/ten-ten-cover-reveal.mp4',
      featured: true,
      trackList: [
        { no: 1, title: 'TEN/TEN', feat: 'KVV', producer: 'Wonderlust' },
        { no: 2, title: 'Nsyafarati', producer: 'Ove6ix' },
        { no: 3, title: 'Lights', spotifyId: '6aeV4YGiLomNXi5TuCMTiO' },
        { no: 4, title: 'Ex-Stacy', feat: 'Killian Stark, Wacko' },
        { no: 5, title: 'Dinero', feat: 'TooColdBaby', producer: 'Ove6ix' },
        { no: 6, title: 'At This Age - Remix', feat: 'KVV', producer: 'Ove6ix' },
        { no: 7, title: 'Bluetooth', feat: 'York', producer: 'Kaiso', spotifyId: '0tvTSRFODMacy4X3Ie4rM5' },
        { no: 8, title: 'GOJO', producer: 'Chie', spotifyId: '2nwaxh63kZ6Bdk9dP5bYbA' },
        { no: 9, title: 'ABJ Tour Guide', producer: 'JiggyYb' },
        { no: 10, title: "Your Lovin'" },
      ],
      tracks: ['TEN/TEN (ft. KVV)', 'Nsyafarati', 'Lights', 'Ex-Stacy', 'Dinero', 'At This Age - Remix', 'Bluetooth (ft. York)', 'GOJO', 'ABJ Tour Guide', "Your Lovin'"],
      spotifyUrl: musicLinks.tenTenSpotify,
      appleMusicUrl: musicLinks.tenTenApple,
      audiomackUrl: musicLinks.tenTenAudiomack,
    },
    {
      id: 'afro-state-of-mind',
      title: 'Afro State Of Mind',
      type: 'EP',
      year: '2024',
      coverEmoji: '🌙',  // placeholder until real artwork provided
      tracks: ['GOJO', 'Lights', 'Bluetooth (ft. Yôrkk)'],
      spotifyUrl: `https://open.spotify.com/album/${MUSIC_IDS.spotifyEpId}`,
      appleMusicUrl: `https://music.apple.com/album/${MUSIC_IDS.appleMusicId}`,
      youtubeUrl: `https://youtube.com/@${MUSIC_IDS.youtubeChannelId}`,              
    },
    {
      id: 'gojo',
      title: 'GOJO',
      type: 'Single',
      year: '2024',
      coverEmoji: '⚡',
      spotifyUrl: `https://open.spotify.com/track/${MUSIC_IDS.spotifyGojoId}`, 
      appleMusicUrl: `https://music.apple.com/album/${MUSIC_IDS.appleMusicId}`,
    },
    {
      id: 'lights',
      title: 'Lights',
      type: 'Single',
      year: '2024',
      coverEmoji: '🔦',
      spotifyUrl: `https://open.spotify.com/track/${MUSIC_IDS.spotifyLightsId}`,
      appleMusicUrl: `https://music.apple.com/album/${MUSIC_IDS.appleMusicId}`,
    },
    {
      id: 'bluetooth',
      title: 'Bluetooth (ft. Yôrkk)',
      type: 'Single',
      year: '2024',
      coverEmoji: '📡',
      spotifyUrl: `https://open.spotify.com/track/${MUSIC_IDS.spotifyBtId}`, 
      appleMusicUrl: `https://music.apple.com/album/${MUSIC_IDS.appleMusicId}`,
    },
  ],

  events: [
    {
      id: 'pressure',
      name: 'PRESSURE',
      type: 'Weekly Event',
      venue: 'Carbon Lounge',
      city: 'Abuja',
      day: 'Every Wednesday',
      description: "Abuja's premier midweek nightlife experience. Music, energy, and everything in between. Promoted by Beetrus.",
      status: 'recurring',
    },
  ],

  socials: {
    spotify: `https://open.spotify.com/artist/${MUSIC_IDS.spotifyArtistId}`,      
    appleMusic: 'https://music.apple.com/us/artist/beetrus/1486745458',
    youtube: `https://youtube.com/@${MUSIC_IDS.youtubeChannelId}`,                    
    instagram: `https://instagram.com/${MUSIC_IDS.instagramHandle}`,                 
    soundcloud: '',                                              
    audiomack: '',                                               
  },
};
