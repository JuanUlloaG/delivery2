import React from "react";
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
import { Size } from "../services/Service";
const Icon = createIconSetFromFontello(fontelloConfig, "fontello");

export default Icon;