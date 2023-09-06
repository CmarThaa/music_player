declare interface Window {
    electronAPI: {
        closeAll: function,
        fileSelect: function,
        storeSet: function,
        storeGet: function,
        onNextPlay: function,
        onPrevPlay: function,
        onMusicStatusToggle: function,
        openLyricModal: function,
        closeLyricModal: function,
        getPort: function,
        postMessage: function,
        onmessage: function,
        openView: function,
        closeLyricModalByModal: function,
    },
}