<script setup lang="ts">
import { useNowLyricTxt } from '../mixins/lyricMixin';
import { computed, onMounted, ref } from 'vue';

const FontSize = ref(3)
function fontSizeUp() {
    FontSize.value += 0.2
}
function fontSizeDown() {
    if (FontSize.value > 0.6) {
        FontSize.value -= 0.2
    }
}
function onClose() {
    window.electronAPI?.closeLyricModal(true)
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
        <span class="btn">
            <el-icon @click="fontSizeUp">
                <CaretTop />
            </el-icon>
            <el-icon @click="fontSizeDown">
                <CaretBottom />
            </el-icon>
            <el-icon @click="onClose">
                <Close />
            </el-icon>
        </span>
        <div class="lyric" :style="{ 'font-size': FontSize + 'rem' }" v-if="displayDetail?.length">
            <div class="prev" :class="cur === 1 ? 'active' : ''">{{ prevLine }}</div>
            <div class="next" :class="cur === 2 ? 'active' : ''">{{ nextLine }}</div>
        </div>
        <div v-else :style="{ 'font-size': FontSize + 'rem' }" class="lyric center">暂无歌词</div>
    </section>
</template>
<style scoped>
.btn {
    display: flex;
    font-size: 2rem;
    color: white;
    width: 6rem;
}

.btn>i {
    cursor: pointer;
}

.app-dragable {
    height: 100%;
    width: 100%;
    cursor: move;
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
    color: rgb(0, 137, 89);
    height: 100%;
    padding: .5rem;
    right: 6rem;
    left: 0;
    user-select: none;
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