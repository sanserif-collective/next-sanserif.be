import ASScroll from '@ashthornton/asscroll'

class CustomASScroll extends ASScroll {
  constructor(parameters?: {
    containerElement?: string | HTMLElement;
    scrollElements?: string | HTMLElement | NodeList;
    ease?: number;
    touchEase?: number;
    touchScrollType?: string;
    scrollbarEl?: string;
    scrollbarHandleEl?: string;
    customScrollbar?: boolean;
    scrollbarStyles?: boolean;
    disableNativeScrollbar?: boolean;
    disableRaf?: boolean;
    disableResize?: boolean;
    limitLerpRate?: boolean;
    blockScrollClass?: string;
  }) {
    super(parameters)

    this.speed = 0
    this.lastPos = 0
    this.lastTime = Date.now()
  }

  speed: number
  lastPos: number
  lastTime: number

  getSpeed() {
    const { controller: { currentPos }, lastTime, lastPos } = this
    const currentTime = Date.now()

    const delayInMs = currentTime - lastTime
    const offsetPos = currentPos - lastPos
    const speedInPxPerMs = offsetPos / delayInMs

    this.lastTime = currentTime
    this.lastPos = currentPos

    return speedInPxPerMs
  }

  update = () => {
    this.speed = this.getSpeed()
    this.events.onRaf()
  }
}

export default CustomASScroll
