interface scrollHandlerFunc {
    (): void
}

let h: scrollHandlerFunc

const handleScroll = () => {
    // 变量scrollTop是滚动条滚动时，距离顶部的距离
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 变量windowHeight是可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    // 变量scrollHeight是滚动条的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    // 滚动条到底部的条件
    if (scrollTop + windowHeight + 600 >= scrollHeight) {
        h()
    }
}

export function useScroll(handler: scrollHandlerFunc) {
    if (!handler) {
        return
    }
    h = handler
    const dom = document.querySelector('main') || window
    dom.addEventListener('scroll', handleScroll)
}
