import React from 'react';

// Keep the startup retry screen available if a scene chunk fails to download.
export class SceneBoundary extends React.Component<{children: React.ReactNode; onFailure: () => void}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  componentDidCatch() {this.props.onFailure();}
  render() {return this.state.failed ? null : this.props.children;}
}
