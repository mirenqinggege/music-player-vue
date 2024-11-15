export interface Song {
    id?: number;
    fee?: number;
    payed?: number;
    realPayed?: number;
    st?: number;
    pl?: number;
    dl?: number;
    sp?: number;
    cp?: number;
    subp?: number;
    cs?: boolean;
    maxbr?: number;
    fl?: number;
    pc?: any;
    toast?: boolean;
    flag?: number;
    paidBigBang?: boolean;
    preSell?: boolean;
    playMaxbr?: number;
    downloadMaxbr?: number;
    maxBrLevel?: string;
    playMaxBrLevel?: string;
    downloadMaxBrLevel?: string;
    plLevel?: string;
    dlLevel?: string;
    flLevel?: string;
    rscl?: any;
    freeTrialPrivilege?: FreeTrialPrivilege;
    chargeInfoList?: ChargeInfoList[];
}

export interface FreeTrialPrivilege {
    resConsumable?: boolean;
    userConsumable?: boolean;
    listenType?: any;
}

export interface ChargeInfoList {
    rate?: number;
    chargeUrl?: any;
    chargeMessage?: any;
    chargeType?: number;
}

/*
* {
  "songId": 29379375,
  "reason": "十万红心",
  "reasonId": "title_10005",
  "targetUrl": null
}
* */

export type RecommendReason = {
    songId: number
    reason: string
    reasonId: string
    targetUrl: string | null
}


export type TransUser = {
    id: number;
    status: number;
    demand: number;
    userid: number;
    nickname: string;
    uptime: number;
}

export type Lrc = {
    version: number;
    lyric: string;
}

export type Klyric = {
    version: number;
    lyric: string;
}

export type Tlyric = {
    version: number;
    lyric: string;
}

export type Romalrc = {
    version: number;
    lyric: string;
}

export type Lyric = {
    sgc: boolean;
    sfy: boolean;
    qfy: boolean;
    transUser: TransUser;
    lrc: Lrc;
    klyric: Klyric;
    tlyric: Tlyric;
    romalrc: Romalrc;
}
