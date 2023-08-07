<script setup lang="ts">
import { useMusicListStore } from '../stores/musics';
const musicStore = useMusicListStore()
const fileSelect = (e: Event) => {
    const files = (e.target as HTMLInputElement)?.files
    const mp3Files = Array.prototype.filter.call(files, v => /.+\.mp3$/.test(v.name)).map(v => ({
        name: v.name,
        path: v.path,
        type: v.type,
        webkitRelativePath: v.webkitRelativePath
    }))
    const jsonFile = JSON.stringify(mp3Files)

    window.electronAPI.storeSet('music_file', jsonFile)
    musicStore.loadFromStorage()
}
</script>
<template>
    <input type="file" webkitdirectory @change="fileSelect">
</template>
<style scoped></style>