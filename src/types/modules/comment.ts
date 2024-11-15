import {Response} from "@/types";

export type VipRights = {
    associator?: any;
    musicPackage?: any;
    redplus?: any;
    redVipAnnualCount: number;
    redVipLevel: number;
    relationType: number;
}

export type CommentUser = {
    locationInfo?: any;
    liveInfo?: any;
    anonym: number;
    avatarDetail?: any;
    userType: number;
    avatarUrl: string;
    followed: boolean;
    mutual: boolean;
    remarkName?: any;
    socialUserId?: any;
    vipRights: VipRights;
    nickname: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
    commonIdentity?: any;
    userId: number;
    target?: any;
}

export type IpLocation = {
    ip?: any;
    location: string;
    userId?: any;
}

export type LikeAnimationMap = {}

export type Associator = {
    vipCode: number;
    rights: boolean;
    iconUrl: string;
}

export type MusicPackage = {
    vipCode: number;
    rights: boolean;
    iconUrl: string;
}

export type Redplus = {
    vipCode: number;
    rights: boolean;
    iconUrl: string;
}


export type Decoration = {}


export type Comments = {
    user: CommentUser;
    beReplied: any[];
    pendantData?: any;
    showFloorComment?: any;
    status: number;
    commentId: number;
    content: string;
    richContent: string;
    contentResource?: any;
    time: number;
    timeStr: string;
    needDisplayTime: boolean;
    likedCount: number;
    expressionUrl?: any;
    commentLocationType: number;
    parentCommentId: number;
    decoration: Decoration;
    repliedMark?: any;
    grade?: any;
    userBizLevels?: any;
    ipLocation: IpLocation;
    owner: boolean;
    medal?: any;
    likeAnimationMap: LikeAnimationMap;
    liked: boolean;
}

export type CommentResponse = {
    isMusician: boolean;
    cnum: number;
    userId: number;
    topComments: any[];
    moreHot: boolean;
    hotComments: Comments[];
    commentBanner?: any;
    code: number;
    comments: Comments[];
    total: number;
    more: boolean;
} & Response

