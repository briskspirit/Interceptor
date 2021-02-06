Interceptor
============

Interceptor for OpenPilot to view live data and control values.
Controls has three modes: interceptor, injector, adder. Interceptor mode substitute all values by it's own, injector mode injects values not equal 0, adder mode just adds or substracts it's value from OP commanded value.

[![Driving with Bluetooth Gamepad](https://github.com/briskspirit/Interceptor/blob/master/gamepad.gif)](https://www.youtube.com/watch?v=7w4aHAXTnpg)


Table of Contents
============

<!--ts-->
 * [Features](#features)
 * [Requirements](#requirements)
 * [Setup](#setup)
 * [Interceptor examples](#interceptor-examples)
   * [Plot graphs with selected data](#plot-graphs-with-selected-data)
   * [Control with gamepad or virtual joystick](#control-with-gamepad-or-virtual-joystick)
 * [FAQ](#faq)
 * [Welcomed contributions](#welcomed-contributions)
<!--te-->


Features
============

**NO NEED for separate Black Panda (that is needed when you want to use joystick tests from stock OP tools)**

Requirements
============

⋅⋅* OpenPilot supported device (EON/C2 etc.) with tethered WiFi connection or connected to the same WiFi network.
⋅⋅* Any device with a web browser(Safari/Firefox/Chromium-based browser) connected to OpenPilot thorugh WiFi or the same WiFi network.
⋅⋅* (recommended) Wired/Wireless gamepad that is supported by your OS. (Example: Gamesir T4pro)

Setup
============
Easiest method:

1. Run `cd /data && rm -rf openpilot && git clone -b briskspirit --single-branch https://github.com/briskspirit/openpilot.git && reboot` on your OpenPilot-compatible device to install my fork based on the latest OpenPilot's master-ci branch with the latest Interceptor included.

2. Connect to your OP device in tethered WiFi mode(hotspot).

3. Enter in your browser `http://192.168.43.1:89` (or change to IP of your OP device if different)


Interceptor examples
============

Plot graphs with selected data
-------------

![LiveDash Graphs](https://github.com/briskspirit/Interceptor/blob/master/LiveDash_graphs.gif "LiveDash Graphs")

Control with gamepad or virtual joystick
-------------

![LiveDash Joystick](https://github.com/briskspirit/Interceptor/blob/master/LiveDash_joystick.gif "LiveDash Joystick")

FAQ
============

Why I might need it?:
-------------
- Do injection tests after changing safety values in Panda (like steerup and steerdown)
- View live data graphs for different OP values(like vEgo, aTarget, steer_angle and any other that is published through ZMQ between OP modules)
- Use onscreen virtual joystick to control values (like set speed, acceleration, steering torque, desired steering angle etc.)
- Show off in front of Tesla friends ? :D (With all safety precautions and off road only!)
- Any other purpose where you need to change OP values on the flight or view those values live.

*This project could potentially help to people with disabilities in the future!*

Welcomed contributions
=============
P.S.: it is still very early alpha version, please don't hesistate to report bugs. Also accepting future requests! ;)