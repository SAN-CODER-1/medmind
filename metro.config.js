const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Required for Firebase + Expo compatibility
config.resolver.sourceExts.push('cjs');

// Optional but safe (prevents weird package resolution issues)
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
