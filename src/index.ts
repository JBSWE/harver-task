import { blendPhotos } from "./utils/blend-photos.util";
const argv = require('minimist')(process.argv.slice(2));
blendPhotos(argv);
