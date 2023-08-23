declare interface Window {
    electronAPI: {
        closeAll: function,
        fileSelect: function,
        storeSet: function,
        storeGet: function,
        onNextPlay: function,
        onPrevPlay: function,
        openLyricModal: function,
        closeLyricModal: function,
    }
}