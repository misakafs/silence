import dayjs, { ConfigType } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 时间展示
export function useTimeDisplay() {
    const td = function (t: ConfigType): string {
        return dayjs(t).fromNow()
    }
    return {
        td
    }
}
