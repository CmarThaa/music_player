<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useMusicListStore } from '../stores/musics';
import { storeToRefs } from 'pinia';

const audioRef = ref<HTMLAudioElement>()
const musicStore = useMusicListStore()
const { inPlaying: nowMusic } = storeToRefs(musicStore)
watch(nowMusic, () => {
    nextTick(() => {
        try {
            audioRef.value?.play()
            if (audioRef.value) {
                audioRef.value.onended = () => {
                    // 根据设置是否循环播放
                    musicStore.playNext()
                }
            }
        } catch (error) {
            alert(error)
        }
    })
})
</script>
<template>
    <div id="player">
        <span>{{ nowMusic?.name }}</span>
        <audio :src="nowMusic?.path" controls ref="audioRef"></audio>
    </div>
</template>
<style scoped>
#player {
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
}

#player>audio {
    flex: 1;
}
</style>