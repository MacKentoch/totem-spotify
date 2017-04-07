export const appConfig = {
  // configure main top navigation bar:
  navigation: {
    brand:      'Totem Spotify',
    leftLinks:  [],
    rightLinks: [
      {
        label:      'Home',
        link:       '/',
        view:       'home',
        isRouteBtn: true
      },
      {
        label:      'About',
        link:       '/about',
        view:       'about',
        isRouteBtn: true
      }
    ]
  },

  // api base urls:
  api: {
    search: 'api/search',
    artist: 'api/artist',
    album:  'api/album'
  }
};

export default appConfig;
