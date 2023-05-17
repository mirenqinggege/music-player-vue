export interface PlayList {
  id?: number;
  name?: string;
  coverImgId?: number;
  coverImgUrl?: string;
  coverImgId_str?: string;
  adType?: number;
  userId?: number;
  createTime?: number;
  status?: number;
  opRecommend?: boolean;
  highQuality?: boolean;
  newImported?: boolean;
  updateTime?: number;
  trackCount?: number;
  specialType?: number;
  privacy?: number;
  trackUpdateTime?: number;
  commentThreadId?: string;
  playCount?: number;
  trackNumberUpdateTime?: number;
  subscribedCount?: number;
  cloudTrackCount?: number;
  ordered?: boolean;
  description?: any;
  updateFrequency?: any;
  backgroundCoverId?: number;
  backgroundCoverUrl?: any;
  titleImage?: number;
  titleImageUrl?: any;
  englishTitle?: any;
  officialPlaylistType?: any;
  copied?: boolean;
  relateResType?: any;
  subscribed?: boolean;
  creator?: Creator;
  tracks?: Track[];
  videoIds?: any;
  videos?: any;
  trackIds?: TrackIds[];
  bannedTrackIds?: any;
  mvResourceInfos?: any;
  shareCount?: number;
  commentCount?: number;
  remixVideo?: any;
  sharedUsers?: any;
  historySharedUsers?: any;
  gradeStatus?: string;
  score?: any;
  algTags?: any;
}

export interface Creator {
  defaultAvatar?: boolean;
  province?: number;
  authStatus?: number;
  followed?: boolean;
  avatarUrl?: string;
  accountStatus?: number;
  gender?: number;
  city?: number;
  birthday?: number;
  userId?: number;
  userType?: number;
  nickname?: string;
  signature?: string;
  description?: string;
  detailDescription?: string;
  avatarImgId?: number;
  backgroundImgId?: number;
  backgroundUrl?: string;
  authority?: number;
  mutual?: boolean;
  expertTags?: any;
  experts?: any;
  djStatus?: number;
  vipType?: number;
  remarkName?: any;
  authenticationTypes?: number;
  avatarDetail?: any;
  avatarImgIdStr?: string;
  backgroundImgIdStr?: string;
  anchor?: boolean;
  avatarImgId_str?: string;
}

export interface Track {
  name?: string;
  id?: number;
  pst?: number;
  t?: number;
  ar?: Ar[];
  pop?: number;
  st?: number;
  rt?: string;
  fee?: number;
  v?: number;
  crbt?: any;
  cf?: string;
  al?: Al;
  dt?: number;
  h?: H;
  m?: M;
  l?: L;
  sq?: any;
  hr?: any;
  a?: any;
  cd?: string;
  no?: number;
  rtUrl?: any;
  ftype?: number;
  djId?: number;
  copyright?: number;
  s_id?: number;
  mark?: number;
  originCoverType?: number;
  originSongSimpleData?: any;
  tagPicList?: any;
  resourceState?: boolean;
  version?: number;
  songJumpInfo?: any;
  entertainmentTags?: any;
  awardTags?: any;
  single?: number;
  noCopyrightRcmd?: any;
  rtype?: number;
  rurl?: any;
  mst?: number;
  cp?: number;
  mv?: number;
  publishTime?: number;
}

export interface Al {
  id?: number;
  name?: string;
  picUrl?: string;
  pic_str?: string;
  pic?: number;
}

export interface H {
  br?: number;
  fid?: number;
  size?: number;
  vd?: number;
  sr?: number;
}

export interface M {
  br?: number;
  fid?: number;
  size?: number;
  vd?: number;
  sr?: number;
}

export interface L {
  br?: number;
  fid?: number;
  size?: number;
  vd?: number;
  sr?: number;
}

export interface Ar {
  id?: number;
  name?: string;
}

export interface TrackIds {
  id?: number;
  v?: number;
  t?: number;
  at?: number;
  alg?: any;
  uid?: number;
  rcmdReason?: string;
  sc?: any;
  f?: any;
  sr?: any;
}

export function equals(track1: Track, track2: Track) {
  return track1.id === track2.id
}
