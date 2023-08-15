import type { MusicStatus } from "./enums";

export type Music = {
    name: string,
    status: `${MusicStatus}`,
    path: string,
    lyricsPath?: string,
    lyrics?: string,
    range?: string,
    duration: string,
    currentTime: number,
    [P: string]: any,
}
