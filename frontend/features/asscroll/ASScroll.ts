import ASScroll from '@ashthornton/asscroll'

export default class CustomASScroll extends ASScroll {
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
  }

  speed = 0
  lastPos = 0
  lastTime = Date.now()

  getSpeed() {
    const { controller: { currentPos }, lastTime, lastPos } = this
    const currentTime = Date.now()

    const delayInMs = currentTime - lastTime
    const offsetPos = currentPos - lastPos
    const speedInpxPerMs = offsetPos / delayInMs

    this.lastTime = currentTime
    this.lastPos = currentPos

    return speedInpxPerMs
  }

  update = () => {
    this.speed = this.getSpeed()
    this.events.onRaf()
  }
}
