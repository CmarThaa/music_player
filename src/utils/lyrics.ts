const TimeReg = /\[\d+:\d+\.?\d{2,}\]/g

/**
 * 
 * @param lyrics 
 * @param cur audio 播放当前时间 单位：秒
 * @returns lyrics 当前行数
 */
export function findIndexByCurrentTime(lyrics: Array<{
    line: string,
    lineTime: string,
}>, cur: number) {
    return lyrics.findIndex((v, idx) => {
        if (idx === lyrics.length - 1) { return true }
        const match = v.lineTime.match(TimeReg)
        if (!match) { return false }
        const timeStr = match[0]

        const timeDate = timeStr.slice(1, timeStr.length - 1)

        const min = Number(timeDate.split(":")[0])
        const sec = Number(timeDate.split(":")[1])
        const lyricTime = 60 * min + sec

        return cur <= lyricTime
    }) - 1
}

export function formatLyricsLrc(lrc: string): Array<{
    line: string,
    lineTime: string
}> {
    let doubleLine: Array<{
        line: string,
        lineTime: string
    }> = [], isDouble = false;

    let res: Array<{
        line: string,
        lineTime: string
    }> = []
    lrc.split("\n").forEach((v) => {
        const match = v.match(TimeReg)
        let lineTime = '', line = '';
        if (match?.length === 1) {
            lineTime = match && match.join('') || ''
            line = v.replace(lineTime, '') || '---'
            if (isDouble) {
                isDouble = false

                res = res.concat(doubleLine)
                doubleLine = []
            }
            res.push({ lineTime, line })
        }
        if (match?.length === 2) {
            isDouble = true
            line = v.replace(match.join('') || '', '') || '---'
            doubleLine.push({ lineTime: match[0], line })
            res.push({ lineTime: match[1], line })
        }
    })

    return res
}