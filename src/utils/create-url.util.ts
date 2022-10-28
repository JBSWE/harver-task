import { getString, ProcessEnv } from '../config';
import { catsInput } from '../models/input.model';

export const createUrl = (argv: catsInput, firstRequest: boolean): string => {
    const url = getString(ProcessEnv.catsBaseUrl);
    const {
        greeting = 'Hello', who = 'You',
        width = 400, height = 500, color = 'Pink', size = 100,
    } = argv;

    return `${url} + ${firstRequest ? greeting : who} + '?width=' + ${width}+ '&height=' + ${height} + '&color=' + ${color} + '&s=' + ${size}`;
}
