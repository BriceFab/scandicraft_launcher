'use strict'

const fs = require('fs')
const axios = require('axios')

export function downloadImage() {
    console.log('Connecting …')
    var downloadedBytes = 0;

    axios({
        method: 'get',
        url: 'http://localhost:8000/launcher/download',
        responseType: 'stream',
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
        },
        onDownloadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
        },
    })
        .then(function (response) {
            console.log('Starting download')
            const totalLength = response.headers['content-length']

            response.data.on('data', (chunk) => {
                // console.log('on chuck')
                // console.log('chunk length ', chunk.length)
                // console.log('chunk total ', totalLength)

                downloadedBytes += chunk.length;
                var progress = (downloadedBytes / totalLength) * 100;

                console.log('progress: ', parseInt(progress, 10))
            })

            response.data.pipe(fs.createWriteStream('scandicraft.zip'))
        })
        .catch((err) => {
            console.log('err', err)
        })
        .finally((ok) => {
            console.log('finish')
        });
}