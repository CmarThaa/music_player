import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Music } from '@/type'
import { CircleTypeEnum, MusicStatus } from '@/enums'
import { usePlayerStore } from './player'
import { ElMessage } from 'element-plus'

export const useMusicListStore = defineStore('music', () => {
    let _alreadyPlay = 0
    const list = ref<Array<Music>>()
    const inPlaying = ref<Music>()
    const playIndex = ref(0)

    const isOpenLyrics = ref(false)

    function setInPlaying(attr: string, val: any) {
        if (inPlaying.value) {
            inPlaying.value[attr] = val
        }
    }
    function setLyricsOpen(open: boolean) {
        if (inPlaying.value) {
            isOpenLyrics.value = open
        }
    }
    function setPlayingLyricsTxt(txt: string) {
        if (inPlaying.value) {
            setInPlaying('lyrics', txt)
        }
    }
    function setList(val: Array<Music>) {
        list.value = val || []
    }

    function play(music: Music) {
        const idx = list.value?.findIndex((v: Music) => v.path === music.path)
        playByIndex(idx)
    }

    function playByIndex(index?: number) {
        if (index === undefined) { return }
        playIndex.value = index
        if (!list.value) {
            ElMessage.error('not exist 歌曲不存在');
            return
        }
        inPlaying.value = list.value[index]
        inPlaying.value.status = MusicStatus.Play
        _alreadyPlay = 1
    }

    function playNext() {
        const playerStore = usePlayerStore()
        if (playerStore.circleType === CircleTypeEnum.Random) {
            playRandom()
            return
        }
        if (list.value?.length) {
            // 循环播放 || 还未播放
            if (playIndex.value + 1 === list.value.length || _alreadyPlay === 0) {
                playByIndex(0)
            } else {
                playByIndex(playIndex.value + 1)
            }
        }
    }

    function playRandom() {
        const max = list.value?.length || 0
        const random = Math.floor(Math.random() * max)
        playByIndex(random)
    }

    function playPrev() {
        const playerStore = usePlayerStore()
        if (playerStore.circleType === CircleTypeEnum.Random) {
            playRandom()
            return
        }
        if (list.value?.length) {
            // 循环播放 || 还未播放
            if (playIndex.value === 0) {
                playByIndex(list.value.length - 1)
            } else {
                playByIndex(playIndex.value - 1)
            }
        }
    }

    // function
    async function loadFromStorage() {
        const storeFiles = JSON.parse(await window.electronAPI.storeGet('music_file'))
        if (storeFiles.length) {
            setList(storeFiles)
        } else {
            setList([])
        }
    }

    return {
        setList, list, playNext, playIndex,
        inPlaying, play, loadFromStorage, playPrev,
        setLyricsOpen, isOpenLyrics, setPlayingLyricsTxt, setInPlaying,
        persist: true,
    }
})
