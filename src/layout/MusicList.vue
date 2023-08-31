<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMusicListStore } from '../stores/musics';
import { storeToRefs } from 'pinia';
import type { Music } from '@/type';
import CircleType from '@/components/CircleType.vue';
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus';
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
function onInput(val: string) {
    filterList.value = musicStore.list?.filter(v => v.name.includes(val)) || []
}
onMounted(async () => {
    try {
        musicStore.loadFromStorage()
    } catch (error) {

    }

    window.electronAPI?.onNextPlay(() => {
        musicStore.playNext()
    })
    window.electronAPI?.onPrevPlay(() => {
        musicStore.playPrev()
    })
})

function openView(val: string) {
    window.electronAPI.openView(`https://www.bing.com/search?q=${val}.lrc`)
}

function searchLyc(music: Music) {
    copyName(music)
    openView(music.name)
}

async function copyName(music: Music) {
    const { toClipboard } = useClipboard()
    try {
        await toClipboard(music.name)
        ElMessage('已复制名称')
    } catch (e) {
        console.error(e)
    }
}

const micRef = ref<Array<HTMLElement>>()

function goNowPlayDom() {
    if (!micRef.value) return
    const dom = micRef.value[musicStore.playIndex]
    console.log(dom);
    dom.scrollIntoView({
        block: 'center',
        inline: 'center'
    })
}
</script>
<template>
    <div class="position">
        <el-icon title="定位当前播放歌曲" @click="goNowPlayDom">
            <LocationInformation />
        </el-icon>
    </div>

    <div>
        <el-input type="text" style="display: inline" v-model="searchVal" autofocus @keyup="onKeyUp" @input="onInput"
            placeholder="过滤歌名"></el-input>
        <CircleType></CircleType>
    </div>

    <section class="mic" :class="index === musicStore.playIndex ? 'playing' : ''" v-for="(music, index) in  displayList "
        :key="index" @dblclick="play(music)" ref="micRef" title="双击播放">
        <div class="name">
            <span>{{ music.name }}</span>
            <div class="icon-wrap" :style="{ 'margin-right': '1rem' }">
                <el-icon @click="play(music)">
                    <VideoPlay />
                </el-icon>

                <el-icon @click="searchLyc(music)">
                    <Search />
                </el-icon>

                <el-icon @click="copyName(music)">
                    <CopyDocument />
                </el-icon>
            </div>
        </div>
    </section>
</template>
<style scoped>
.mic {
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

.name {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.icon-wrap>* {
    margin-left: .2rem;
    cursor: pointer;
}

.icon-wrap>*:hover {
    color: rgb(151, 151, 245);
    transform: scale(1.05);
}

.position {
    font-size: 1.5rem;
    margin-left: 1rem;
    vertical-align: middle;
    cursor: pointer;
    position: fixed;
    bottom: 20%;
    right: .5rem;
    border: 1px solid #eaeaea;
}

.position:hover {
    transform: scale(1.1);
    color: rgb(148, 148, 251);
}
</style>