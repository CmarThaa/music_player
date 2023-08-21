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

// TODO : 依据 时间：歌词行 拆开单行，  二次循环 按时间排序
export function formatLyricsLrc(lrc: string): Array<{
    line: string,
    lineTime: string
}> {
    let res: Array<{
        line: string,
        lineTime: string
    }> = []

    lrc.split("\n").forEach((v) => {
        const match = v.match(TimeReg)
        let lineTime = '', line = '';
        lineTime = match && match.join('') || ''
        line = v.replace(lineTime, '') || '---' // 当前歌词
        match?.forEach(mat => {
            res.push({ lineTime: mat, line })
        })
    })
    // 排序
    res.sort((a, b) => a.lineTime > b.lineTime ? 1 : -1)
    console.log(res); // 多行歌词拆开
    return res
}