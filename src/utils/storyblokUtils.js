export function withWebpSupport(url) {
    if (!url.endsWith('/m/')) {
        url = url + '/m/';
    }
    return url;
}