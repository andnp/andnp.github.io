import { StandardLonghandProperties } from 'csstype';
import * as React from 'react';
import portrait from '../../../images/portrait.jpg';
import Markdown from '../../utils/Markdown';
import { ResizeWatcher } from '../../utils/resizeWatcher';
import aboutMd from './about.md';
import homeMd from './home.md';

class HomeRoute extends ResizeWatcher<{}, { isPersonalSectionStacked: boolean }> {
  public render() {
    const flexDirection: StandardLonghandProperties = this.state.isPersonalSectionStacked
      ? { flexDirection: 'row' }
      : { flexDirection: 'column' };

    return (
      <div style={{ display: 'flex', ...flexDirection }}>
        <Markdown remote={homeMd} />
        {this.getPersonalSection()}
      </div>
    );
  }

  protected onLargeScreen = () => this.setState({ isPersonalSectionStacked: true });
  protected onSmallScreen = () => this.setState({ isPersonalSectionStacked: false });

  private getPersonalSection() {
    const AboutElement = <Markdown remote={aboutMd}/>;
    const PortraitElement = <img style={{ width: '290px', height: '386px' }} src={portrait} />;

    if (this.state.isPersonalSectionStacked) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '4em' }}>
          {PortraitElement}
          {AboutElement}
        </div>
      );
    } else {
      return (
        <>
        {AboutElement}
        {PortraitElement}
        </>
      );
    }
  }
}

export default HomeRoute;
