const React = require('react');
const ReactDOM = require('react-dom');
const remoteDOM = require('../remote');
const localDOM = require('../local');
const testUtils = require('./testUtils');

let domContainer, remoteContainer, localContainer;
let counter = 0;

describe('video tests', () => {
  beforeEach(() => {
    domContainer = testUtils.jsdomDefaultView.document.createElement('div');
    const id = 'container_' + counter++;
    testUtils.jsdomDefaultView.document.body.appendChild(domContainer);
    localContainer = localDOM.createContainer(testUtils.localQueue, domContainer, id);
    remoteContainer = remoteDOM.createContainer(id);
  });

  it('should support get src', done => {
    const vidSrc = 'http://video.webmfiles.org/big-buck-bunny_trailer.webm';
    const expectFunc = (videoNode) => {
      videoNode.src = vidSrc;
      expect(videoNode.src).toBe(vidSrc);
      done();
    };
    const statelessComp = (props) => (<video ref={expectFunc}></video>);
    ReactDOM.render(React.createElement(statelessComp), remoteContainer);
  });

  it('should support set src', done => {
    const vidSrc = 'http://video.webmfiles.org/big-buck-bunny_trailer.webm';
    const expectFunc = (videoNode) => {
      const localVideoElement = domContainer.firstChild;
      videoNode.src = vidSrc;
      expect(localVideoElement.src).toBe(vidSrc);
      done();
    };
    const statelessComp = (props) => (<video ref={expectFunc}></video>);
    ReactDOM.render(React.createElement(statelessComp), remoteContainer);
  });

  it('should support pause', done => {
    const vidSrc = 'http://video.webmfiles.org/big-buck-bunny_trailer.webm';
    const expectFunc = (videoNode) => {
      const localVideoElement = domContainer.firstChild;
      localVideoElement.pause = jest.fn();
      videoNode.pause();
      expect(localVideoElement.pause).toHaveBeenCalled();
      done();
    };
    const statelessComp = (props) => (<video src={props.src} ref={expectFunc}></video>);
    ReactDOM.render(React.createElement(statelessComp, {src: vidSrc}), remoteContainer);
  });

  it('should support play', done => {
    const vidSrc = 'http://video.webmfiles.org/big-buck-bunny_trailer.webm';
    const expectFunc = (videoNode) => {
      const localVideoElement = domContainer.firstChild;
      localVideoElement.play = jest.fn();
      videoNode.play();
      expect(localVideoElement.play).toHaveBeenCalled();
      done();
    };
    const statelessComp = (props) => (<video src={props.src} ref={expectFunc}></video>);
    ReactDOM.render(React.createElement(statelessComp, {src: vidSrc}), remoteContainer);
  });
});
