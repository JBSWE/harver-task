import { catsInput } from '../models/input.model';
import { fetchCat } from '../services/cat.service';
import { join } from 'path';
import { writeFile } from 'fs';
import { applicationLogger } from '../logger/application-logger';
const blend = require('@mapbox/blend');

export const blendPhotos = async (argv: catsInput) => {
    const firstImageBuffer =  await fetchCat(argv, true);
    const secondImageBuffer =  await fetchCat(argv);

    await blendImages(firstImageBuffer,secondImageBuffer, argv)
}

export const blendImages = async(firstImageBuffer: ArrayBuffer, secondImageBuffer: ArrayBuffer, argv: catsInput) => {
    const { width = 400, height = 500 } = argv;
    blend([
            // @ts-ignore
            { buffer: Buffer.from(firstImageBuffer, 'binary'), x: 0, y:0 },
            // @ts-ignore
            { buffer: Buffer.from(secondImageBuffer, 'binary'), x: width, y: 0 }
        ],
        { width: width * 2, height: height, format: 'jpeg', },
        // @ts-ignore
        (err, data) => {
            applicationLogger.error('error', err)
            const fileOut = join(process.cwd(), `/cat-card.jpg`);

            writeFile(fileOut, data, 'binary', (err) => { if(err) {
                applicationLogger.error(err)
                    return;
                }
                applicationLogger.info('The file was saved!')
                }
            );
        });
}
