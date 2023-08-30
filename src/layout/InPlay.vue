<script setup lang="ts">
import { nextTick, ref, watch, computed, onMounted } from 'vue';
import { useMusicListStore } from '../stores/musics';
import { storeToRefs } from 'pinia';
import { CircleTypeEnum, MusicStatus } from '../enums';
import { usePlayerStore } from '../stores/player';
const showName = ref(true)
const audioRef = ref<HTMLAudioElement>()
const musicStore = useMusicListStore()
const { inPlaying: nowMusic } = storeToRefs(musicStore)
function openLyric() { musicStore.setLyricsOpen(true) }
watch(nowMusic, (music) => {
    nextTick(() => {
        try {
            if (music?.status === MusicStatus.Play)
                audioRef.value?.play()
        } catch (error) {
            alert(error)
        }
    })
})
onMounted(() => {
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
        audioRef.value.ontimeupdate = () => {
            const cur = audioRef.value?.currentTime
            musicStore.setInPlayingAttr('currentTime', cur)
            try {
                window.electronAPI.postMessage({
                    inPlaying: JSON.stringify(musicStore.inPlaying),
                })
            } catch (error) {
                // console.info('messageError', error);
            }
        }
        audioRef.value.ondurationchange = () => {
            musicStore.setInPlayingAttr('duration', audioRef.value?.duration)
        }
    }
})
const displayName = computed(() => nowMusic.value?.name || '暂未播放')
</script>
<template>
    <div id="player" @mouseenter="showName = false" @mouseleave="showName = true">
        <div class="info">
            <span v-if="showName">
                {{ displayName }}
            </span>
            <span v-else class="opts">
                <el-tag type="info" round @click="openLyric">歌词</el-tag>
            </span>
        </div>
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

.info {
    display: inline-block;
    width: 5rem;
    white-space: nowrap;
    overflow: hidden;
}

.opts>* {
    cursor: pointer;
}

#player>audio {
    flex: 1;
}
</style>