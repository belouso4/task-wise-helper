import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg'
import fs from 'fs';
import path from 'path';

ffmpeg.setFfmpegPath(installer.path)

export const youtubeToMp3 = async (url, outputPath) => {
    return new Promise((resolve, reject) => {
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const stream = ytdl(url, { quality: 'highestaudio' });
        ffmpeg(stream)
            .audioBitrate(128)
            .save(outputPath)
            .on('end', () => {
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export const getVideoTitle = async (url) => {
    try {
        const info = await ytdl.getInfo(url);
        return info.videoDetails.title;
    } catch (error) {
        console.error('Error fetching video title:', error);
        throw error;
    }
}