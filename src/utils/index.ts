import dayjs from 'dayjs'
import type { ConfigType } from 'dayjs'

export function formatTime(time: ConfigType, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}
