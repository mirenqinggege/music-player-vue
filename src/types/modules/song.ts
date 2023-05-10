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
