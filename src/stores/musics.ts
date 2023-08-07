import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
type Music = {
    name: string,
    status?: boolean,
    path: string,
    [P: string]: any,
}

export const useMusicListStore = defineStore('music', () => {
    const list = ref<Array<Music>>()
    const inPlaying = ref<Music>()
    const playIndex = ref(0)
    function setList(val: Array<Music>) {
        list.value = val
    }

    function play(music: Music) {
        inPlaying.value = music
        playIndex.value = list.value?.findIndex((v: Music) => v.path === music.path) || 0
    }

    function playByIndex(index: number) {
        playIndex.value = index
        if (!list.value) {
            alert("not exist")
            console.log('not exist');
            return
        }
        inPlaying.value = list.value[index]
    }

    function playNext() {
        if (list.value?.length) {
            if (playIndex.value === list.value.length) {
                playByIndex(0)
            } else {
                playByIndex(playIndex.value + 1)
            }
        }
    }
    async function loadFromStorage() {
        const storeFiles = JSON.parse(await window.electronAPI.storeGet('music_file'))
        if (storeFiles.length) {
            setList(storeFiles)
        }
    }

    return {
        setList, list, playNext,
        inPlaying, play, loadFromStorage,
        persist: true,
    }
})
