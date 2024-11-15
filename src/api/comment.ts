import {CommentResponse, PageParams, Response} from "@/types";
import request from "./request.ts";

export function getCommentList(id: number, pageParams: PageParams): Promise<CommentResponse> {
    return request(
        "POST",
        `https://music.163.com/api/v1/resource/comments/R_SO_4_${id}`,
        {rid: id, limit: pageParams.pageSize, offset: (pageParams.pageNum - 1) * pageParams.pageSize, beforeTime: 0},
        {
            crypto: 'weapi'
        }
    )
}

export function likeComment(commentId: number, songId: number): Promise<Response> {
    return request(
        'POST',
        'https://music.163.com/weapi/v1/comment/like',
        {
            threadId: 'R_SO_4_' + songId,
            commentId
        },
        {
            crypto: 'weapi'
        }
    )
}

export function unlikeComment(commentId: number, songId: number): Promise<Response> {
    return request(
        'POST',
        'https://music.163.com/weapi/v1/comment/unlike',
        {
            threadId: 'R_SO_4_' + songId,
            commentId
        },
        {
            crypto: 'weapi'
        }
    )
}