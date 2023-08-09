import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { CircleTypeEnum } from '@/enums'
export const usePlayerStore = defineStore('player', () => {
    const circleType = ref<CircleTypeEnum>(CircleTypeEnum.ListCircle)

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
    }

    return { circleType, changeCircleType }
})