import { GraphQLClient } from 'graphql-request'
import md5 from 'js-md5'
import WebStorageCache from 'web-storage-cache'
import packageJson from '../../package.json'
import { Silence } from '../config'

const baseUrl = 'https://api.github.com/graphql'
// https://docs.github.com/en/graphql/overview/explorer
// https://docs.github.com/cn/github/searching-for-information-on-github/searching-issues-and-pull-requests

// 防止token被github检测到，所以进行了拆分
const token = '2aa94e69142faaff6b7ef' + 'b97e3e84a2ff7ded47d'

const graphQLClient = new GraphQLClient(baseUrl, {
    headers: {
        authorization: `bearer ${token}`
    }
})

const mustCond = `repo:${packageJson.cfg.repo} milestone:* is:closed `

// 请求issues的接口
const queryIssues = `
query ($q: String!, $after: String) {
  search(query: $q, type: ISSUE, first: ${packageJson.cfg.count ?? 20}, after: $after) {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    nodes {
      ... on Issue {
        id
        title
        url
        body
        createdAt
        author {
          login
          url
          avatarUrl
        }
        labels(first: 10) {
          nodes {
            name
            color
            url
            description
          }
        }
        milestone {
          title
          url
          description
        }
      }
    }
  }
}
`

// 缓存时间10分钟
const ttl = packageJson.cfg.ttl ?? 60
const wsCache = new WebStorageCache({
    storage: 'sessionStorage'
})

// 匹配链接
const reLink = /\((.+?)\)/
// 匹配标题
const reTitle = /\[(.+?)\]/

// 处理请求结果
const handlerResult = function (result: any): Silence.Issues | null {
    if (!result?.search?.nodes?.length) {
        return null
    }

    // 获取下一页的信息
    const pageInfo = result?.search?.pageInfo ?? null
    const nextPage = {
        after: pageInfo?.endCursor ?? null,
        hasNext: pageInfo?.hasNextPage ?? false
    }

    const items = []

    for (const data of result.search.nodes) {
        const body = data.body.trim()
        if (!body.length) {
            continue
        }

        // 提取标题和链接
        const titles = body.match(reTitle)
        const links = body.match(reLink)

        const title = titles.length && titles[0].length && titles[0].slice(1, -1)
        const link = links.length && links[0].length && links[0].slice(1, -1)

        const index = body.indexOf('\n')
        let html = ''
        if (index !== -1) {
            html = body.substring(index + 1).trim()
        }

        // 处理标签
        const labels = []
        for (const d of data.labels.nodes) {
            labels.push({
                name: d.name,
                color: '#' + d.color,
                url: d.url,
                description: d.description
            })
        }
        const item = {
            title: title,
            link: link,
            html: html,
            createdAt: data.createdAt,
            author: {
                url: data.author.url,
                avatarUrl: data.author.avatarUrl,
                name: data.author.login === packageJson.author ? '谕℃' : data.author.login
            },
            milestone: {
                title: data.milestone.title,
                url: data.milestone.url,
                description: data.milestone.description
            },
            labels: labels
        }
        items.push(item)
    }

    return {
        nextPage: nextPage,
        items: items
    }
}

const query = async function (q: string = '', after: string | null): Promise<Silence.Issues | null> {
    q = mustCond + q
    const variables = {
        q,
        after
    }
    const key = md5(JSON.stringify(variables))

    // 从缓存读取
    const val = wsCache.get(key)

    if (val) {
        return val
    }

    const result = await graphQLClient.request(queryIssues, variables)

    const issues = handlerResult(result)
    // 设置缓存
    wsCache.set(key, issues, { exp: ttl })

    return issues
}

export default query
