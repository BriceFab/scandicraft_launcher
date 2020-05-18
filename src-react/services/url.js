import config from '../../config/config.json';

export function openURL(url) {
    require("electron").shell.openExternal(url);
}

export function webURLFromURI(uri) {
    return config.WEB_BASE_URL + uri;
}