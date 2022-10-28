import axios from 'axios';
import { applicationLogger } from '../logger/application-logger';
import { createUrl } from '../utils/create-url.util';
import { catsInput } from '../models/input.model';

export const fetchCat = async (argv: catsInput, firstRequest = false): Promise<ArrayBuffer> => {
    const url = createUrl(argv, firstRequest);
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer'});
        applicationLogger.info(response.status)
        return response.data
    } catch(e){
        const error = e as Error
        applicationLogger.error(`Error fetching cat: ${error}`)
        return new ArrayBuffer(0)
    }
}
