<script setup lang="ts">
import { getImageUrl } from '../assets/images';

const preloaderRef = ref();

onMounted(() => {
    const fadeEffect = setInterval(() => {
        if (unref(preloaderRef)) {
            if (!unref(preloaderRef).style.opacity) {
                unref(preloaderRef).style.opacity = 1;
            }

            if (unref(preloaderRef).style.opacity > 0) {
                unref(preloaderRef).style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                unref(preloaderRef).classList.add("hide");
            }
        }
    }, 300);
});
</script>

<template>
    <div ref="preloaderRef"
        class="fixed top-0 left-0 z-[9999] flex items-center justify-center w-full h-screen transition-opacity duration-200 preloader bg-gray-900">
        <div class="flex flex-col items-center">
            <div class="mb-8">
                <img :src="getImageUrl('logo')" alt="NokiPay" class="w-32 h-32 animate-pulse" />
            </div>
            <div class="loader-container">
                <div class="loader">
                    <div class="loader-bar"></div>
                    <div class="loader-bar"></div>
                    <div class="loader-bar"></div>
                    <div class="loader-bar"></div>
                    <div class="loader-bar"></div>
                </div>
            </div>
            <div class="mt-6 text-white text-lg font-medium">Chargement...</div>
        </div>
    </div>
</template>

<style scoped>
.hide{display:none!important}.loader-container{height:60px;position:relative;width:200px}.loader{display:flex;height:8px;justify-content:space-between;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:100%}.loader-bar{animation:loader 1.5s ease-in-out infinite;background-color:#ffdd0f;border-radius:3px;height:100%;width:15px}.loader-bar:first-child{animation-delay:0s}.loader-bar:nth-child(2){animation-delay:.15s}.loader-bar:nth-child(3){animation-delay:.3s}.loader-bar:nth-child(4){animation-delay:.45s}.loader-bar:nth-child(5){animation-delay:.6s}@keyframes loader{0%,to{background-color:#ffdd0f;transform:scaleY(1)}50%{background-color:gold;transform:scaleY(2)}}@keyframes pulse{0%,to{opacity:1}50%{opacity:.6}}.animate-pulse{animation:pulse 2s ease-in-out infinite}
</style>