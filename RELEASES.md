Version 0.1.3  (2021-02-14)
=========================
* Stop rendering hidden tabs, improves performance
* Joystick.js: fix switching between rested modes
* Interceptor buttons switch value type from boolean to float (support for analog buttons)
* Fix graphs resizing, performance improvements for Graphs
* Catch errors on JSON parsing in WebSocketHelper
* Updated example for 0.8.2 big refactoring
* First implementation of dark theme, needs improvement

Version 0.1.2  (2021-02-07)
=========================
 * Add op_params.json file editor
 * Add error popups handler to LiveDash
 * Auto-fill WS IP when not localhost, helps for served.py execs
 * GraphSettings.js, webgl bugfix
 * ScatterPlot.js, fix switching between zoom and pan
 * Hide packets received/transfered if not connected
 * WebSocket: Increase keepalive packet interval from 1sec to 2.5sec
 * WS: lower max reconnection delay from 10s to 5s

Version 0.1.1  (2021-02-03)
=========================
 * Settings for Joystick/Gamepad (axesModes, interpolation, deadzone)
 * Added served.py as a http server for local use and on C2/EON device (port 89)
 * Changed default port for WebSocket to 8989
 
Version 0.1  (2021-02-01)
=========================
 * Initial release of Interceptor tools package
 * Joystick/Gamepad controls are working
 * Live data plotting is working
