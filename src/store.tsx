import { atom } from 'jotai'
interface ImageInterface {
    name: string,
    size: number,
    type: string,
    url: string
}
export class Image implements ImageInterface {
    name: string;
    size: number;
    type: string;
    url: string;
    constructor(name: string, size: number, type: string, url: string) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.url = url;
    }
}

interface UploadErrorInterface {
    message: string,
    hasError: boolean
}

export class UploadError implements UploadErrorInterface {
    message: string;
    hasError: boolean;
    constructor(message: string, hasError: boolean) {
        this.message = message;
        this.hasError = hasError;
    }
}


export const dragOverAtom = atom<boolean>(false);
export const progressAtom = atom<number>(0);
export const stepAtom = atom<number>(1);
export const imageAtom = atom<Image>(new Image('', 0, '', ''));
export const errorAtom = atom<UploadError>(new UploadError('', false));
