import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { CircleTypeEnum } from '@/enums'
export const usePlayerStore = defineStore('player', () => {
    const circleType = ref<CircleTypeEnum>(CircleTypeEnum.ListCircle)
    window.electronAPI.storeGet('circleTypeSettingStore').then((res: CircleTypeEnum) => {
        circleType.value = res
    })
    function changeCircleType() {
        switch (circleType.value) {
            case CircleTypeEnum.ListCircle:
                circleType.value = CircleTypeEnum.Single
                break;
            case CircleTypeEnum.Single:
                circleType.value = CircleTypeEnum.Random
                break;
            case CircleTypeEnum.Random:
                circleType.value = CircleTypeEnum.ListCircle
                break;

            default:
                break;
        }

        window.electronAPI?.storeSet('circleTypeSettingStore', circleType.value)
    }

    return { circleType, changeCircleType }
})