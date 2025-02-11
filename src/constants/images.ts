import { Image } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const logo = require('@/assets/app/logo.png');

export const logoApp = Image.resolveAssetSource(logo).uri
