import { MUSIC_IDS } from "./musicIds";

export interface Release {
  id: string;
  title: string;
  type: string;
  year: string;
  coverEmoji: string;
  tracks?: string[];
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl?: string;
  audiomackUrl?: string;
}

export const musicData = {
  artistName: 'Beetrus',
  bio: 'Beetrus is an Abuja-based recording artist, producer, and event promoter. His sound blends Afrosounds, R&B, and Drill into a distinctly Nigerian experience — introspective, textured, and built for the late night. His debut EP "Afro State Of Mind" established him as one of Abuja\'s most promising independent acts.',
  
  releases: [
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
    appleMusic: 'https://music.apple.com/artist/beetrus',         
    youtube: `https://youtube.com/@${MUSIC_IDS.youtubeChannelId}`,                    
    instagram: `https://instagram.com/${MUSIC_IDS.instagramHandle}`,                 
    soundcloud: '',                                              
    audiomack: '',                                               
  },
};
