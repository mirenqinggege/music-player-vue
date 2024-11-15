import {Al, Ar, ChargeInfoList, FreeTrialPrivilege, H, L, M} from "@/types";

export type S = {
    br: number;
    fid: number;
    size: number;
    vd: number;
    sr: number;
}

export type Privilege = {
    id: number;
    fee: number;
    payed: number;
    realPayed: number;
    st: number;
    pl: number;
    dl: number;
    sp: number;
    cp: number;
    subp: number;
    cs: boolean;
    maxbr: number;
    fl: number;
    pc?: any;
    toast: boolean;
    flag: number;
    paidBigBang: boolean;
    preSell: boolean;
    playMaxbr: number;
    downloadMaxbr: number;
    maxBrLevel: string;
    playMaxBrLevel: string;
    downloadMaxBrLevel: string;
    plLevel: string;
    dlLevel: string;
    flLevel: string;
    rscl?: any;
    freeTrialPrivilege: FreeTrialPrivilege;
    rightSource: number;
    chargeInfoList: ChargeInfoList[];
    code: number;
    message?: any;
}

export type DailySong = {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia?: string[];
    pop: number;
    st: number;
    rt: string;
    fee: number;
    v: number;
    crbt?: any;
    cf: string;
    al: Al;
    dt: number;
    h: H;
    m: M;
    l: L;
    hr?: any;
    a?: any;
    cd: string;
    no: number;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData?: any;
    tagPicList?: any;
    resourceState: boolean;
    version: number;
    songJumpInfo?: any;
    entertainmentTags?: any;
    single: number;
    noCopyrightRcmd?: any;
    rtype: number;
    rurl?: any;
    mst: number;
    cp: number;
    mv: number;
    publishTime: number;
    reason?: any;
    recommendReason?: any;
    privilege: Privilege;
    alg: string;
}

export type RecommendReasons = {
    songId: number;
    reason: string;
    reasonId: string;
    targetUrl?: any;
}

export type Data = {
    dailySongs: DailySong[];
    orderSongs: any[];
    recommendReasons: RecommendReasons[];
    mvResourceInfos?: any;
    demote: boolean;
}

export type RecommendSongResponse = {
    code: number;
    data: Data;
}