import {Response, Track} from "@/types";

export type Artists = {
    id: number;
    name: string;
    picUrl?: any;
    alias: any[];
    albumSize: number;
    picId: number;
    fansGroup?: any;
    img1v1Url: string;
    img1v1: number;
    trans?: any;
}

export type Artist = {
    id: number;
    name: string;
    picUrl?: any;
    alias: any[];
    albumSize: number;
    picId: number;
    fansGroup?: any;
    img1v1Url: string;
    img1v1: number;
    trans?: any;
}

export type Album = {
    id: number;
    name: string;
    artist: Artist;
    publishTime: number;
    size: number;
    copyrightId: number;
    status: number;
    picId: number;
    mark: number;
}

export type SearchSong = {
    id: number;
    name: string;
    artists: Artists[];
    album: Album;
    duration: number;
    copyrightId: number;
    status: number;
    alias: any[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl?: any;
    mark: number;
}

export type Result = {
    songs: Track[];
    hasMore: boolean;
    songCount: number;
}

export type SearchResultResponse = {
    result: Result;
    code: number;
} & Response