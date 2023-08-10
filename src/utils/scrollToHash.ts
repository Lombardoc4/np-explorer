export const scrollToHash = () => {
    const hash = window.location.hash;
    if (hash.length > 0) {
        const el = document.querySelector(hash) as HTMLElement;
        el?.scrollIntoView();
    }
}