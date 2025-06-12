import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// Set up DRACO loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/'); // Points to public/draco/

export { dracoLoader };