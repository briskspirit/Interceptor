export const available_signals = {
  "thermal": {
    "freeSpacePercent": 0.2097935676574707,
    "batteryPercent": 100,
    "fanSpeedPercentDesired": 10,
    "started": false,
    "usbOnline": false,
    "startedMonoTime": 0,
    "thermalStatus": "green",
    "batteryCurrent": 594631,
    "batteryVoltage": 4237493,
    "chargingError": false,
    "chargingDisabled": false,
    "memoryUsagePercent": 35,
    "cpuUsagePercent": 20,
    "networkType": "wifi",
    "offroadPowerUsage": 25131,
    "networkStrength": "good",
    "carBatteryCapacity": 29755978,
    "cpu": [
      45.400001525878906,
      44.79999923706055,
      43.5,
      43.79999923706055
    ],
    "gpu": [
      41.900001525878906
    ],
    "mem": 44.5,
    "bat": 0,
    "ambient": 36
  },
  "controlsState": {
    "vPid": 0,
    "vTargetLead": 0,
    "upAccelCmd": 0,
    "uiAccelCmd": 0,
    "cumLagMs": 0,
    "enabled": false,
    "vCruise": 0,
    "longitudinalPlanMonoTime": 0,
    "angleSteersDes": 0,
    "longControlState": "off",
    "state": "disabled",
    "ufAccelCmd": 0,
    "aTarget": 0,
    "active": false,
    "curvature": 0,
    "alertStatus": "normal",
    "alertSize": "none",
    "engageable": false,
    "alertBlinkingRate": 0,
    "startMonoTime": 0,
    "lateralPlanMonoTime": 0,
    "forceDecel": false,
    ":lateralControlState.indiState.active": false,
    ":lateralControlState.indiState.steerAngle": 94.94609832763672,
    ":lateralControlState.indiState.steerRate": -3.0533325976085657e-13,
    ":lateralControlState.indiState.steerAccel": -2.4426660780868525e-12,
    ":lateralControlState.indiState.rateSetPoint": 0,
    ":lateralControlState.indiState.accelSetPoint": 0,
    ":lateralControlState.indiState.accelError": 0,
    ":lateralControlState.indiState.delayedOutput": 0,
    ":lateralControlState.indiState.delta": 0,
    ":lateralControlState.indiState.output": 0,
    ":lateralControlState.indiState.saturated": false,
    "alertSound": "none",
    "canErrorCounter": 0
  },
  "health": {
    "voltage": 12087,
    "current": 0,
    "ignitionLine": false,
    "controlsAllowed": false,
    "gasInterceptorDetected": false,
    "hasGps": true,
    "canSendErrs": 2663915,
    "canFwdErrs": 0,
    "gmlanSendErrs": 0,
    "pandaType": "uno",
    "fanSpeedRpm": 375,
    "usbPowerMode": "cdp",
    "ignitionCan": false,
    "safetyModel": "noOutput",
    "faultStatus": "none",
    "powerSaveEnabled": true,
    "uptime": 2419218,
    "canRxErrs": 0
  },
  "radarState": {
    ":leadOne.dRel": 0,
    ":leadOne.yRel": 0,
    ":leadOne.vRel": 0,
    ":leadOne.aRel": 0,
    ":leadOne.vLead": 0,
    ":leadOne.dPath": 0,
    ":leadOne.vLat": 0,
    ":leadOne.vLeadK": 0,
    ":leadOne.aLeadK": 0,
    ":leadOne.fcw": false,
    ":leadOne.status": false,
    ":leadOne.aLeadTau": 0,
    ":leadOne.modelProb": 0,
    ":leadOne.radar": false,
    ":leadTwo.dRel": 0,
    ":leadTwo.yRel": 0,
    ":leadTwo.vRel": 0,
    ":leadTwo.aRel": 0,
    ":leadTwo.vLead": 0,
    ":leadTwo.dPath": 0,
    ":leadTwo.vLat": 0,
    ":leadTwo.vLeadK": 0,
    ":leadTwo.aLeadK": 0,
    ":leadTwo.fcw": false,
    ":leadTwo.status": false,
    ":leadTwo.aLeadTau": 0,
    ":leadTwo.modelProb": 0,
    ":leadTwo.radar": false,
    "cumLagMs": -40.058692932128906,
    "mdMonoTime": 14472189831128,
    "canMonoTimes": [],
    "controlsStateMonoTime": 14472189113524,
    "radarErrors": []
  },
  "liveCalibration": {
    "calStatus": 1,
    "calCycle": 0,
    "calPerc": 100,
    "extrinsicMatrix": [
      0.019966470077633858,
      -0.9998006224632263,
      0.00019015562429558486,
      0,
      0.009523315355181694,
      -1.3552527156068805e-20,
      -0.9999546408653259,
      1.2200000286102295,
      0.999755322933197,
      0.019967375323176384,
      0.009521417319774628,
      0
    ],
    "rpyCalib": [
      -0.000023826511096558534,
      -0.00952345971018076,
      0.019968701526522636
    ],
    "rpyCalibSpread": [
      0,
      0,
      0
    ],
    "validBlocks": 50
  },
  "carState": {
    "vEgo": 0,
    ":wheelSpeeds.fl": 0,
    ":wheelSpeeds.fr": 0,
    ":wheelSpeeds.rl": 0,
    ":wheelSpeeds.rr": 0,
    "gas": 0,
    "gasPressed": false,
    "brake": 0,
    "brakePressed": false,
    "steeringAngle": 94.94609832763672,
    "steeringTorque": -4,
    "steeringPressed": false,
    ":cruiseState.enabled": false,
    ":cruiseState.speed": 0,
    ":cruiseState.available": false,
    ":cruiseState.speedOffset": 0,
    ":cruiseState.standstill": false,
    ":cruiseState.nonAdaptive": false,
    "gearShifter": "park",
    "steeringRate": 0,
    "aEgo": 0,
    "vEgoRaw": 0,
    "standstill": true,
    "brakeLights": false,
    "leftBlinker": false,
    "rightBlinker": false,
    "yawRate": 0,
    "genericToggle": false,
    "doorOpen": false,
    "seatbeltUnlatched": false,
    "canValid": false,
    "steeringTorqueEps": -42.5,
    "clutchPressed": false,
    "steeringRateLimited": false,
    "stockAeb": false,
    "stockFcw": false,
    "espDisabled": false,
    "leftBlindspot": false,
    "rightBlindspot": false,
    "steerWarning": false,
    "steerError": false
  },
  "carControl": {
    "enabled": false,
    ":cruiseControl.cancel": false,
    ":cruiseControl.override": true,
    ":cruiseControl.speedOverride": 0.30000001192092896,
    ":cruiseControl.accelOverride": 1,
    ":hudControl.speedVisible": false,
    ":hudControl.setSpeed": 70.83333587646484,
    ":hudControl.lanesVisible": false,
    ":hudControl.leadVisible": false,
    ":hudControl.visualAlert": "none",
    ":hudControl.audibleAlert": "none",
    ":hudControl.rightLaneVisible": false,
    ":hudControl.leftLaneVisible": false,
    ":hudControl.rightLaneDepart": false,
    ":hudControl.leftLaneDepart": false,
    ":actuators.gas": 0,
    ":actuators.brake": 0,
    ":actuators.steer": 0,
    ":actuators.steerAngle": 0,
    "active": false
  },
  "longitudinalPlan": {
    "vTarget": 0,
    "hasLead": true,
    "fcw": false,
    "mdMonoTime": 123295710706333,
    "radarStateMonoTime": 123295747127478,
    "vTargetFuture": 7.642090019328552e-31,
    "longitudinalPlanSource": "mpc1",
    "vCruise": 0,
    "aCruise": 0,
    "aTarget": 0,
    "vMax": 0,
    "vStart": 0,
    "aStart": 0,
    "processingDelay": 0.0022163549438118935,
  },
  "driverState": {
    "frameId": 210,
    "faceOrientation": [
      -0.19331105053424835,
      0.42528432607650757,
      0.19331105053424835
    ],
    "facePosition": [
      0.2706354856491089,
      0.19331105053424835
    ],
    "faceProb": 1.005217432975769,
    "leftEyeProb": 1.005217432975769,
    "rightEyeProb": 1.005217432975769,
    "leftBlinkProb": 0.03866221010684967,
    "rightBlinkProb": 0.03866221010684967,
    "faceOrientationStd": [
      0.05159972980618477,
      0.04607699066400528,
      0.03534235060214996
    ],
    "facePositionStd": [
      0.011215822771191597,
      0.005191889591515064
    ],
    "sunglassesProb": 0.03866221010684967,
    "modelExecutionTime": 0.01499489601701498,
    "dspExecutionTime": 0.012737344019114971,
    "poorVision": 0.46394652128219604,
    "partialFace": 0.07732442021369934,
    "distractedPose": 0.03866221010684967,
    "distractedEyes": 0.03866221010684967,
  },
  "liveParameters": {
    "valid": true,
    "gyroBias": 0,
    "angleOffset": 0.4804331064224243,
    "angleOffsetAverage": 0.4804331064224243,
    "stiffnessFactor": 1,
    "steerRatio": 16.623638153076172,
    "sensorValid": true,
    "yawRate": 0,
    "posenetSpeed": 0,
    "posenetValid": true,
  },
  "cameraOdometry": {
    "trans": [
      0.0141754150390625,
      -0.00048542022705078125,
      0.002925872802734375
    ],
    "rot": [
      0,
      0,
      0
    ],
    "transStd": [
      0.023609790951013565,
      0.015066033229231834,
      0.0341513529419899
    ],
    "rotStd": [
      0.0007046477403491735,
      0.0006267267162911594,
      0.0007678816327825189
    ],
    "frameId": 343,
    "timestampEof": 14476174423000
  },
  "lateralPlan": {
    "laneWidth": 2.799999952316284,
    "lProb": 0.15726622939109802,
    "rProb": 0.17652960121631622,
    "angleSteers": -23.378400802612305,
    "mpcSolutionValid": true,
    "angleOffset": 0.4804331064224243,
    "rateSteers": 0,
    "desire": "none",
    "laneChangeState": "off",
    "laneChangeDirection": "none",
    "dPathPoints": [
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125,
      -0.005084991455078125
    ],
    "dProb": 0,
  },
  "carParams": {
    "carName": "toyota",
    "carFingerprint": "TOYOTA COROLLA TSS2 2019",
    "enableGasInterceptor": false,
    "enableCruise": true,
    "enableCamera": true,
    "enableDsu": false,
    "enableApgs": false,
    "minEnableSpeed": -1,
    "minSteerSpeed": 0,
    "safetyModel": "toyota",
    "safetyParam": 50,
    "steerMaxBP": [
      0
    ],
    "steerMaxV": [
      1
    ],
    "gasMaxBP": [
      0
    ],
    "gasMaxV": [
      0.5
    ],
    "brakeMaxBP": [
      0
    ],
    "brakeMaxV": [
      1
    ],
    "mass": 1523.9915771484375,
    "wheelbase": 2.6700000762939453,
    "centerToFront": 1.1748000383377075,
    "steerRatio": 15.329999923706055,
    "steerRatioRear": 0,
    "rotationalInertia": 2548.41552734375,
    "tireStiffnessFront": 186196.578125,
    "tireStiffnessRear": 231266.25,
    ":longitudinalTuning.kpBP": [
      0,
      5,
      20
    ],
    ":longitudinalTuning.kpV": [
      1.2999999523162842,
      1,
      0.699999988079071
    ],
    ":longitudinalTuning.kiBP": [
      0,
      5,
      12,
      20,
      27
    ],
    ":longitudinalTuning.kiV": [
      0.3499999940395355,
      0.23000000417232513,
      0.20000000298023224,
      0.17000000178813934,
      0.10000000149011612
    ],
    ":longitudinalTuning.deadzoneBP": [
      0,
      8.050000190734863
    ],
    ":longitudinalTuning.deadzoneV": [
      0,
      0.14000000059604645
    ],
    ":lateralTuning.indi.outerLoopGainBP": [
      18,
      22,
      26
    ],
    ":lateralTuning.indi.outerLoopGainV": [
      8,
      11,
      14.899999618530273
    ],
    ":lateralTuning.indi.innerLoopGainBP": [
      18,
      22,
      26
    ],
    ":lateralTuning.indi.innerLoopGainV": [
      9,
      12,
      15
    ],
    ":lateralTuning.indi.timeConstantBP": [
      18,
      22,
      26
    ],
    ":lateralTuning.indi.timeConstantV": [
      1,
      3,
      4.5
    ],
    ":lateralTuning.indi.actuatorEffectivenessBP": [
      18,
      22,
      26
    ],
    ":lateralTuning.indi.actuatorEffectivenessV": [
      9,
      12,
      15
    ],
    "steerLimitAlert": false,
    "vEgoStopping": 0,
    "directAccelControl": false,
    "stoppingControl": false,
    "startAccel": 1.2000000476837158,
    "steerRateCost": 0.5,
    "steerControlType": "torque",
    "radarOffCan": false,
    "steerActuatorDelay": 0.44999998807907104,
    "openpilotLongitudinalControl": true,
    "carVin": "JTDS4MCE2MJ056503",
    "isPandaBlack": true,
    "dashcamOnly": false,
    "safetyModelPassive": "silent",
    "transmissionType": "unknown",
    // "carFw": [
    //   {
    //     "ecu": "esp",
    //     "fwVersion": "\u0001F152612B90\u0000\u0000\u0000\u0000\u0000\u0000",
    //     "address": 1968,
    //     "subAddress": 0
    //   },
    //   {
    //     "ecu": "engine",
    //     "fwVersion": "\u00018966312M9000\u0000\u0000\u0000\u0000",
    //     "address": 1792,
    //     "subAddress": 0
    //   },
    //   {
    //     "ecu": "eps",
    //     "fwVersion": "\u00018965B12350\u0000\u0000\u0000\u0000\u0000\u0000",
    //     "address": 1953,
    //     "subAddress": 0
    //   },
    //   {
    //     "ecu": "fwdRadar",
    //     "fwVersion": "\u00018821F3301400\u0000\u0000\u0000\u0000",
    //     "address": 1872,
    //     "subAddress": 15
    //   },
    //   {
    //     "ecu": "fwdCamera",
    //     "fwVersion": "\u00028646F1201300\u0000\u0000\u0000\u00008646G2601400\u0000\u0000\u0000\u0000",
    //     "address": 1872,
    //     "subAddress": 109
    //   }
    // ],
    "radarTimeStep": 0.05000000074505806,
    "communityFeature": false,
    "steerLimitTimer": 0.4000000059604645,
    "fingerprintSource": "can",
    "networkLocation": "fwdCamera",
    "minSpeedCan": 0.30000001192092896,
    "stoppingBrakeRate": 0.10000000149011612,
    "startingBrakeRate": 2
  },
  "driverMonitoringState": {
    "faceDetected": true,
    "isDistracted": false,
    "awarenessStatus": 1,
    "posePitchOffset": 0,
    "posePitchValidCount": 0,
    "poseYawOffset": 0,
    "poseYawValidCount": 0,
    "stepChange": 0.00909090880304575,
    "awarenessActive": 1,
    "awarenessPassive": 1,
    "isLowStd": true,
    "hiStdCount": 0,
    "isActiveMode": true,
  },
  "frontFrame": {
    "frameId": 235,
    "encodeId": 0,
    "timestampEof": 123298601953000,
    "frameLength": 4494,
    "integLines": 4483,
    "globalGain": 175,
    "frameType": "front",
    "timestampSof": 0,
    "lensPos": 0,
    "lensSag": 0,
    "lensErr": 0,
    "lensTruePos": 0,
    "gainFrac": 0.2196885049343109,
    "recoverState": 0,
  },
  "testJoystick": {
    "axes": [],
    "buttons": [],
    "enabled": false,
    "axesMode": [],
  }
};