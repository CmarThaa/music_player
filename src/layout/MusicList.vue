<script setup lang="ts">
import { onMounted } from 'vue';
import { useMusicListStore } from '../stores/musics';
const musicStore = useMusicListStore()
function play(music: any) {
    console.log(music);
    musicStore.play(music)
}
onMounted(async () => {
    try {
        musicStore.loadFromStorage()
    } catch (error) {

    }
})
</script>
<template>
    <section class="mic" v-for="(music, index) in musicStore.list" :key="index" @click="play(music)">
        {{ music.name }}
    </section>
</template>
<style scoped>
.mic {
    cursor: pointer;
}

.mic:hover {
    color: rgb(78, 128, 76);
}
</style>