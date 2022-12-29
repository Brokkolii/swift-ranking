const { getTracksForAlbum } = require("./spotify");

function getAlbumIds() {
  const albums = [
    {
      id: "5eyZZoQEFQWRHkV2xgAeBw",
      //id: "56yYgfX6M5FlpETfyZSHkn", // Demi Lovato
      name: "Taylor Swift",
    },
    {
      id: "4hDok0OAJd57SGIT8xuWJH",
      name: "Fearless (Taylor's Version)",
    },
    {
      id: "6Ar2o9KCqcyYF9J0aQP3au",
      name: "Speak Now",
    },
    {
      id: "6kZ42qRrzov54LcAk4onW9",
      name: "Red (Taylor's Version)",
    },
    {
      id: "5fy0X0JmZRZnVa2UEicIOl",
      name: "1989",
    },
    {
      id: "6DEjYFkNZh67HP7R9PSZvv",
      name: "Reputation",
    },
    {
      id: "1NAmidJlEaVgA3MpcPFYGq",
      name: "Lover",
    },
    {
      id: "2fenSS68JI1h4Fo296JfGr",
      name: "folklore",
    },
    {
      id: "6AORtDjduMM3bupSWzbTSG",
      name: "evermore (deluxe version)", // right where you left me is missing on this one (deluxe?)
    },
    {
      id: "3lS1y25WAhcqJDATJK70Mq",
      name: "Midnights (3am Edition)",
    },
  ];
  // Handpicked albums to avoid duplicates
  // Full list:
  /*
  [
    'Midnights (3am Edition) (3lS1y25WAhcqJDATJK70Mq)',
    'Midnights (3am Edition) (4894htPwC6zoiuTqUQwn4I)',
    'Midnights (151w1FgRZfnKZA9FEcg9Z3)',
    'Midnights (4moVP48t9bji7djUc5VOvi)',
    "Red (Taylor's Version) (6kZ42qRrzov54LcAk4onW9)",
    "Red (Taylor's Version) (6x9s2ObPdpATZgrwxsk9c0)",
    "Fearless (Taylor's Version) (4hDok0OAJd57SGIT8xuWJH)",
    'evermore (deluxe version) (6AORtDjduMM3bupSWzbTSG)',
    'evermore (deluxe version) (1DT6fDJL6AWPJxe7Lq1dPb)',
    'evermore (2Xoteh7uEpea4TohMxjtaq)',
    'evermore (5jmVg7rwRcgd6ARPAeYNSm)',
    'folklore: the long pond studio sessions (from the Disney+ special) [deluxe edition] (0PZ7lAru5FDFHuirTkWe9Z)',
    'folklore: the long pond studio sessions (from the Disney+ special) [deluxe edition] (3VaaZ7OIbGLi60NVsnueoo)',
    'folklore (deluxe version) (1pzvBxYgT6OVwJLtHkrdQK)',
    'folklore (deluxe version) (7v7pe5vZQPWB5zW0JrKRiw)',
    'folklore (2fenSS68JI1h4Fo296JfGr)',
    'folklore (0xS0iOtxQRoJvfcFcJA5Gv)',
    'Lover (1NAmidJlEaVgA3MpcPFYGq)',
    'Taylor Swift Karaoke: reputation (1MHuZZrGT36cXLxAQ5cLP3)',
    'reputation (6DEjYFkNZh67HP7R9PSZvv)',
    'reputation (Big Machine Radio Release Special) (1Hrs3jLGexOvBoaPMoOQYJ)',
    'reputation Stadium Tour Surprise Song Playlist (1MPAXuTVL2Ej5x0JHiSPq8)',
    'Taylor Swift Karaoke: 1989 (Deluxe) (0bEySlRAkuPxV9KVWhXXBr)',
    '1989 (Big Machine Radio Release Special) (6EsTJnpahwW6xX20zvqQgZ)',
    '1989 (5fy0X0JmZRZnVa2UEicIOl)',
    '1989 (Deluxe) (1yGbNOtRIgdIiGHOEBaZWf)',
    'Red (Deluxe Edition) (1KVKqWeRuXsJDLTW0VuD29)',
    'Red (Big Machine Radio Release Special) (4jTYApZPMapg56gRycOn0D)',
    'Red (7daMnnffzVSbNJj8Dy75Ev)',
    'Speak Now World Tour Live (6fyR4wBPwLHKcRtxgd4sGh)',
    'Speak Now (6Ar2o9KCqcyYF9J0aQP3au)',
    'Speak Now (Big Machine Radio Release Special) (75N0Z60SNMQbAPYZuxKgWd)',
    'Speak Now (Karaoke Version) (3QXlUpSDgakWZK2WqQv0pF)',
    'Speak Now (Deluxe Package) (6S6JQWzUrJVcJLK4fi74Fw)',
    'Fearless (6tgMb6LEwb3yj7BdYy462y)',
    'Fearless (International Version) (08CWGiv27MVQhYpuTtvx83)',
    'Fearless (Big Machine Radio Release Special) (3EzFY9Rg0PpbADMth746zi)',
    'Fearless (Karaoke Version) (1CYlmaXajTC59VJWSSeE7Y)',
    'Fearless (Platinum Edition) (2gP2LMVcIFgVczSJqn340t)',
    'Live From Clear Channel Stripped 2008 (1ycoesYxIFymXWebfmz828)',
    'Taylor Swift (5eyZZoQEFQWRHkV2xgAeBw)',
    'Taylor Swift (Big Machine Radio Release Special) (2rU7u7C2v5i45MFVxx7xG1)',
    'Taylor Swift (Karaoke Version) (1mFGeuBwVfAyli6aDoy9OI)'
  ]
  */
  return albums.map((album) => album.id);
}

module.exports = { getAlbumIds };
