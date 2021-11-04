export const requestFullScreen = (element:HTMLElement) => {
    if (element.requestFullscreen) {
     return element.requestFullscreen();
    }
}

export const exitFullScreen = () =>{
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}