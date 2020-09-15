import * as React from 'react';

type ResizeHandler = ((width: number) => void) | (() => void);

const callbacks: ResizeHandler[] = [];

window.onresize = () => {
  const width = window.innerWidth;
  callbacks.forEach(f => f(width));
};

export const addResizeHandler = (f: (width: number) => void) => (callbacks.push(f), f(window.innerWidth), f);
export const deleteResizeHandler = (f: ResizeHandler) => {
  const cb = callbacks.findIndex(v => v === f);
  if (cb === -1) return;

  callbacks.splice(cb, 1);
}

export const onSmallScreen = (f: ResizeHandler) => addResizeHandler((width) => {
  if (width < 500) f(width);
});

export const onLargeScreen = (f: ResizeHandler) => addResizeHandler((width) => {
  if (width >= 500) f(width);
});

export abstract class ResizeWatcher<P = {}, S = {}> extends React.Component<P, S> {
  protected abstract onSmallScreen?: ResizeHandler;
  protected abstract onLargeScreen?: ResizeHandler;

  public componentDidMount() {
    if (this.onSmallScreen) onSmallScreen(this.onSmallScreen);
    if (this.onLargeScreen) onLargeScreen(this.onLargeScreen);
  }

  public componentWillUnmount() {
    if (this.onSmallScreen) deleteResizeHandler(this.onSmallScreen);
    if (this.onLargeScreen) deleteResizeHandler(this.onLargeScreen);
  }

}
