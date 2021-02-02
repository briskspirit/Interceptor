import { Component } from 'react';
import propTypes from 'prop-types';


export class WebSocketHelper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: null
    };

  }

  timeout = 250;

  componentDidMount() {
    this.connect();
    this.keep_alive = setInterval(() => {
      this.sendMessage({ keepAlive: {} });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.keep_alive);
    this.setState({ ws: null })
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.ws_url !== this.props.ws_url;
  }

  connect = () => {
    var ws = new WebSocket(this.props.ws_url);
    this.props.status("connecting");
    let that = this; // cache the this
    var connectInterval;

    ws.onopen = () => {
      this.setState({ ws: ws });
      this.props.status("connected");
      that.timeout = 250;
      clearTimeout(connectInterval);
    };

    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout * 2) / 1000
        )} second.`,
        e.reason
      );
      this.props.status("closed");
      that.timeout = that.timeout * 2;
      connectInterval = setTimeout(this.checkSocketConnection, Math.min(10000, that.timeout));
    };

    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      this.props.status("error");
      ws.close();
    };

    ws.onmessage = event => {
      this.props.messageProcess(JSON.parse(event.data));
    };

  }

  sendMessage = (msg) => {
    const { ws } = this.state;
    if (ws && ws.readyState !== WebSocket.CLOSED) ws.send(JSON.stringify(msg));
  }

  checkSocketConnection = () => {
    const { ws } = this.state;
    if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(this.props.ws_url);
  }

  render() {
    //console.log("Rendering WebSocketHelper");
    return null;
  }
}

WebSocketHelper.propTypes = {
  ws_url: propTypes.string.isRequired,
  status: propTypes.func.isRequired,
  messageProcess: propTypes.func.isRequired,
}