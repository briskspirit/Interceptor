struct Joystick {
  # convenient for debug and live tuning
  axes @0: List(Float32);
  buttons @1: List(Float32);
  enabled @2: Bool;
  axesMode @3: List(Text);
}
