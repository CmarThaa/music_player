<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useMusicListStore } from '../stores/musics';
import { storeToRefs } from 'pinia';
import { CircleTypeEnum, MusicStatus } from '../enums';
import { usePlayerStore } from '../stores/player';

const audioRef = ref<HTMLAudioElement>()
const musicStore = useMusicListStore()
const { inPlaying: nowMusic } = storeToRefs(musicStore)
watch(nowMusic, (music) => {
    nextTick(() => {
        try {
            if (music?.status === MusicStatus.Play)
                audioRef.value?.play()
            if (audioRef.value) {
                audioRef.value.onended = () => {
                    const playerStore = usePlayerStore()
                    if (playerStore.circleType === CircleTypeEnum.Single) {
                        // 根据设置是否单曲循环
                        audioRef.value?.play()
                    } else {
                        musicStore.playNext()
                    }
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