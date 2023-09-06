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
    const audioDom = ref()

    const isOpenLyrics = ref(false)
    function setAudioDom(ele: HTMLAudioElement) {
        audioDom.value = ele
    }

    function setInPlaying(val: Music) {
        inPlaying.value = val
    }
    function setInPlayingAttr(attr: string, val: any) {
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
            setInPlayingAttr('lyrics', txt)
        }
    }
    function setList(val: Array<Music>) {
        list.value = val || []
    }

    function play(music: Music) {
        const idx = list.value?.findIndex((v: Music) => v.path === music.path)
        playByIndex(idx)
    }
    function stop(music: Music) {
        const idx = list.value?.findIndex((v: Music) => v.path === music.path)
        stopByIndex(idx)
    }

    function stopByIndex(index?: number) {
        if (index === undefined) { return }
        if (inPlaying.value) {
            audioDom.value?.pause()
        }
    }
    function playByIndex(index?: number) {
        if (index === undefined) { return }
        playIndex.value = index
        if (!list.value) {
            ElMessage.error('not exist 歌曲不存在');
            return
        }
        inPlaying.value = list.value[index]
        audioDom.value.src = inPlaying.value.path
        audioDom.value?.play()
        _alreadyPlay = 1
    }

    function togglePlayStatus() {
        if (inPlaying.value?.status === MusicStatus.Play) {
            stopByIndex(playIndex.value)
        }
        if (inPlaying.value?.status === MusicStatus.Stop) {
            playByIndex(playIndex.value)
        }
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
        const storeFiles = JSON.parse(await window.electronAPI?.storeGet('music_file'))
        if (storeFiles.length) {
            setList(storeFiles)
        } else {
            setList([])
        }
    }

    return {
        setList, list, playNext, playIndex, togglePlayStatus,
        inPlaying, play, loadFromStorage, playPrev, stop,
        setLyricsOpen, isOpenLyrics, setPlayingLyricsTxt, setInPlayingAttr,
        setInPlaying, setAudioDom,
        persist: true,
    }
})
