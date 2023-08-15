<script setup lang="ts">
import { useMusicListStore } from '../stores/musics';
const musicStore = useMusicListStore()
const fileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement)?.files || []
    const filesArray = Array.from(files)
    const mp3Files = filesArray.filter(v => /.+\.mp3$/.test(v.name)).map(v => {
        const lyricsPath = filesArray.find(l => l.name.split(".lrc")[0] === v.name.split(".mp3")[0])
        return {
            name: v.name.split(".mp3")[0],
            path: (v as any).path,
            type: v.type,
            webkitRelativePath: v.webkitRelativePath,
            lyricsPath: (lyricsPath as any)?.path
        }
    })
    const jsonFile = JSON.stringify(mp3Files)

    window.electronAPI.storeSet('music_file', jsonFile)
    musicStore.loadFromStorage()
}
</script>
<template>
    <input type="file" webkitdirectory @change="fileSelect">
</template>
<style scoped></style>