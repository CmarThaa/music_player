import type { MusicStatus } from "./enums";

export type Music = {
    name: string,
    status: `${MusicStatus}`,
    path: string,
    [P: string]: any,
}
