const fs = require('fs');
import { axiosPostWithConfig } from "../../common/services/axios";
import CONFIG from '../../config/config.json';
import { LAUNCHER_CONFIG } from '../config/launcher';

export default async function installFiles(files) {
    // const downloaded_file = await downloadServerFiles(files);

    console.log('delete wrong files')
    console.log('unzip downloaded files')
}