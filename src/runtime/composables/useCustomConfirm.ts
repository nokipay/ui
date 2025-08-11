export const useCustomConfirm = () => {
    return inject<Ref<{ show: Function }>>('confirm')
};