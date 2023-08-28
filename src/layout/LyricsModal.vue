<script setup lang="ts">
import { useNowLyricTxt } from '../mixins/lyricMixin';
import { computed, onMounted, ref } from 'vue';

function onClose() {
    window.electronAPI?.closeLyricModal()
}
const { displayDetail, curLineIdx, musicStore } = useNowLyricTxt()

const prevLine = computed(() => {
    if ((curLineIdx.value + 1) % 2 === 0) {
        cur.value = 1
        return displayDetail.value[curLineIdx.value].line
    } else {
        cur.value = 2
        return curLineIdx.value + 2 >= displayDetail.value.length ? '' : displayDetail.value[curLineIdx.value + 1].line
    }
})
const nextLine = computed(() => {
    if ((curLineIdx.value + 1) % 2 === 0) {
        return displayDetail.value[curLineIdx.value + 1].line
    } else {
        return displayDetail.value[curLineIdx.value].line
    }
})

const cur = ref(1)

onMounted(() => {
    window.electronAPI?.onmessage((e: any) => {
        try {
            const data = JSON.parse(e.inPlaying)
            console.log(data);
            musicStore.setInPlaying(data)
        } catch (error) {
            console.info('onmessage error', error);
        }
    })
})

</script>
<template>
    <section class="modal">
        <div class="app-dragable"></div>
        <span class="btn" @click="onClose">
            <el-icon>
                <Close />
            </el-icon>
        </span>
        <div class="lyric" v-if="displayDetail?.length">
            <div class="prev" :class="cur === 1 ? 'active' : ''">{{ prevLine }}</div>
            <div class="next" :class="cur === 2 ? 'active' : ''">{{ nextLine }}</div>
        </div>
        <div v-else class="lyric center">暂无歌词</div>
    </section>
</template>
<style scoped>
.btn {
    cursor: pointer;
    font-size: 2rem;
    color: white;
}

.app-dragable {
    height: 100%;
    width: 100%;
}

.modal {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: end;
    background-color: #918f8f12;
}

.active {
    color: red;
}

.lyric {
    position: fixed;
    top: 0;
    font-size: 3rem;
    color: white;
    height: 100%;
    width: 100%;
    padding: .5rem;
    right: 2rem;
}

.lyric.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.prev,
.next {
    position: absolute;
    white-space: nowrap;
}


.prev {
    top: 0;
    left: 2.5rem;
}

.next {
    right: 1.5rem;
    bottom: .5rem;
}
</style>