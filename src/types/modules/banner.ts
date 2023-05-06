export interface BannerItem {
  cover: string
  meta: Record<string, any>
  key?: string
}

export interface BannerProps {
  bannerList: BannerItem[]
}

export interface Banner {
  bannerBizType: string
  encodeId: string
  exclusive: string
  imageUrl: string
  scm: string
  targetId: string
  targetType: string
  titleColor: string
  typeTitle: string
}
