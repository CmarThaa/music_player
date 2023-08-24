import { useMusicListStore } from "@/stores/musics"
import { findIndexByCurrentTime, formatLyricsLrc } from "@/utils/lyrics"
import { storeToRefs } from "pinia"
import { computed, ref, watch } from "vue"

export function useNowLyricTxt() {
    const musicStore = useMusicListStore()
    const { inPlaying } = storeToRefs(musicStore)
    const displayLyrics = ref()
    const curLineIdx = computed(() => {
        const cur = inPlaying.value?.currentTime || 0
        return findIndexByCurrentTime(displayDetail.value, cur)
    })
    watch(inPlaying, async val => {
        if (val && val.lyricsPath) {
            if (!val.lyrics) {
                const res = await fetch(val.lyricsPath)
                const txt = await res.text()
                musicStore.setPlayingLyricsTxt(txt)
            }
            displayLyrics.value = val.lyrics || ''
        } else {
            displayLyrics.value = ''
        }
    })
    const displayDetail = computed(() => formatLyricsLrc(displayLyrics.value))

    return {
        displayDetail, curLineIdx,
        inPlaying
    }

}