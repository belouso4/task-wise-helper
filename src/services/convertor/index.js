import { getVideoTitle, youtubeToMp3 } from "./youtubeToMp3.js";
import fs from 'fs'

class Convertor {
    static async fromYoutubeToMp3(url) {
        const title = await this.getVideoTitle(url);
        const folder = `./src/assets/audio/${Date.now()}`;
        const outputPath = `${folder}/${title}.mp3`;

        try {
            await youtubeToMp3(url, outputPath);
            console.log('Download and conversion successful');
            return { outputPath, folder }
        } catch (error) {
            console.log('Error during download and conversion', error);
        }
    }

    static async getVideoTitle(url) {
        try {
            return await getVideoTitle(url);
        } catch (error) {
            console.log('Error fetching video title', error);
        }
    }

    static async deleteFile(path) {
        try {
            fs.rmSync(path, { recursive: true, force: true });
        } catch (error) {
            console.log('Error during download and conversion', error);
        }
    }
}

export default Convertor