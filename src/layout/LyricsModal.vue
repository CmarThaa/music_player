<script setup lang="ts">
import { useNowLyricTxt } from '../mixins/lyricMixin';
import { computed, ref } from 'vue';

function onClose() {
    window.electronAPI?.closeLyricModal()
}
const { displayDetail, curLineIdx } = useNowLyricTxt()

const prevLine = computed(() => {
    if ((curLineIdx.value + 1) % 2 === 0) {
        cur.value = 1
        return displayDetail.value[curLineIdx.value + 1]
    } else {
        cur.value = 2
        return curLineIdx.value + 2 >= displayDetail.value.length ? '' : displayDetail.value[curLineIdx.value + 2]
    }
})
const nextLine = computed(() => {
    if ((curLineIdx.value + 1) % 2 === 0) {
        return displayDetail.value[curLineIdx.value + 2]
    } else {
        return displayDetail.value[curLineIdx.value + 1]
    }
})

const cur = ref(1)

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
            <div class="prev" :class="cur === 1 ? 'cur' : ''">{{ prevLine }}</div>
            <div class="next" :class="cur === 2 ? 'cur' : ''">{{ nextLine }}</div>
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

.lyric {
    position: fixed;
    top: 0;
    font-size: 4rem;
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
}

.prev {
    top: -1.5rem;
}

.next {
    right: 1.5rem;
    bottom: .5rem;
}
</style>