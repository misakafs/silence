export namespace Silence {
    export enum StickyNoteTheme {}

    // 便签参数
    export interface StickyNoteOption {
        milestone: string
    }

    // 作者信息
    export interface Author {
        // 作者github地址
        url: string
        // 作者头像地址
        avatarUrl: string
        // 作者昵称
        name: string
    }

    // 里程碑
    export interface Milestone {
        // 标题
        title: string
        url: string
        description: string
    }

    // 标签
    export interface Label {
        // 名字
        name: string
        // 背景色
        color: string
        url: string
        description: string
    }

    // 提案
    export interface IssueOption {
        // 提案原地址
        link: string
        // 标题
        title: string
        // 创建时间
        createdAt: string
        // 原文
        html: string
        // 作者信息
        author: Author
        // 里程碑信息
        milestone: Milestone
        // 标签信息
        labels: Label[]
    }

    // 下一页的参数
    export interface NextPage {
        // 下一页token
        after: string | null
        // 是否有下一页
        hasNext: boolean
    }

    // 提案列表
    export interface Issues {
        // 下一页信息
        nextPage: NextPage
        // 数据列表
        items: IssueOption[] | null
    }
}
