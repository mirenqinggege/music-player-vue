export interface BannerItem {
  cover: string
  meta: Record<string, any>
  key?: string
}

export interface BannerProps {
  bannerList: BannerItem[]
}
