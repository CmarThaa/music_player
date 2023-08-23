import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
export const useSettingStore = defineStore('setting', () => {
    window.electronAPI?.storeGet('lyricModalSettingStore').then((res: '1' | '0') => {
        lyricModalSetting.value = res === '1' ? true : false
    })
    const lyricModalSetting = ref(false)
    watch(lyricModalSetting, val => {
        if (val) {
            window.electronAPI?.openLyricModal()
        } else {
            window.electronAPI?.closeLyricModal()
        }
        window.electronAPI?.storeSet('lyricModalSettingStore', val ? '1' : '0')
    })
    return {
        lyricModalSetting,
        persist: true
    }
})