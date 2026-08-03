const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  // packagerConfig: {
  //   icon: './images/icon'
  // },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux','win32']
    },
    // {
    //   name: '@electron-forge/maker-deb',
    //   platforms: ['linux']
    // }
  ]
};