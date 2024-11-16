import {PageParams, SearchResultResponse} from "@/types";
import request from "@/api/request.ts";

export function search(keyword: string, pageParams: PageParams): Promise<SearchResultResponse> {
    return request(
        "POST",
        "https://music.163.com/weapi/cloudsearch/get/web",
        {
            s: keyword,
            type: 1,
            limit: pageParams.pageSize,
            offset: (pageParams.pageNum - 1) * pageParams.pageSize
        },
        {
            crypto: 'weapi'
        }
    )
}