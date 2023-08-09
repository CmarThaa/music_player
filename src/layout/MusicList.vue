<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMusicListStore } from '../stores/musics';
import { storeToRefs } from 'pinia';
import { Music } from '@/type';
import CircleType from '@/components/CircleType.vue';
const searchVal = ref()
const musicStore = useMusicListStore()
const musicStoreRef = storeToRefs(musicStore)
const filterList = ref<Array<Music>>([])
const displayList = computed(() => {
    if (filterList.value && filterList.value.length) {
        return filterList.value
    }
    return musicStoreRef.list.value
})
function play(music: any) {
    musicStore.play(music)
}
function onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        if (filterList.value?.length)
            play(filterList.value[0])
    }
}
function onInput(val: Event) {
    const value = (val.target as HTMLInputElement).value
    filterList.value = musicStore.list?.filter(v => v.name.includes(value)) || []
}
onMounted(async () => {
    try {
        musicStore.loadFromStorage()
    } catch (error) {

    }

    window.electronAPI.onNextPlay(() => {
        musicStore.playNext()
    })
    window.electronAPI.onPrevPlay(() => {
        musicStore.playPrev()
    })
})
</script>
<template>
    <div>
        <input type="text" v-model="searchVal" autofocus @keyup="onKeyUp" @input="onInput" placeholder="过滤歌名">
        <CircleType></CircleType>
    </div>
    <section class="mic" :class="index === musicStore.playIndex ? 'playing' : ''" v-for="(music, index) in  displayList "
        :key="index" @click="play(music)" ref="micRef">
        <div class="name">{{ music.name }}</div>
    </section>
</template>
<style scoped>
.mic {
    cursor: pointer;
    border: 1px dashed #ccc;
    margin: .2rem 0;
}

.mic.playing {
    color: rgb(78, 128, 76);
    border: 1px solid rgb(178, 178, 249);
    height: 3rem;
}

.mic.playing .mic:hover {
    color: rgb(78, 128, 76);
    border: 1px solid rgb(178, 178, 249);
}
</style>