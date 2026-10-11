import React from 'react';

// Keep the startup retry screen available if a scene chunk fails to download.
export class SceneBoundary extends React.Component<{children: React.ReactNode; onFailure: () => void}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  componentDidCatch() {this.props.onFailure();}
  render() {return this.state.failed ? null : this.props.children;}
}

export class RoomBoundary extends React.Component<{children: React.ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  render() {
    return this.state.failed ? <section className="room-load-error" role="alert"><h2>This page could not load.</h2><p>Reload to retrieve the latest files, or choose another world below.</p><button onClick={() => location.reload()}>Reload page</button></section> : this.props.children;
  }
}
