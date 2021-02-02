#!/usr/bin/env python
PARTS = ['negative', 'positive', 'full']  # up and left is negative, down and right is positive
MODES = ['interceptor', 'injector', 'adder']


class Interceptor:
  def __init__(self):
    self.enabled = False
    self.interceptor = None
    self.watchdog = 2 * 1e9  # In 2 sec disable interceptor if there is no new messages

  def update(self, msg, msg_timestamp, current_timestamp):
    if msg_timestamp < current_timestamp - self.watchdog:
      self.enabled = False
      return

    self.enabled = msg.enabled
    self.interceptor = msg

  def override_axis(self, signal, index, part, scale=1.0):
    if (not self.enabled
        or len(self.interceptor.axes) < index + 1
        or part not in PARTS):
      return signal

    signal_candidate = self.interceptor.axes[index] * scale
    if part == 'negative':
      signal_candidate = max(-signal_candidate, 0.)
    elif part == 'positive':
      signal_candidate = max(signal_candidate, 0.)

    if (len(self.interceptor.axesMode) <= index 
        or self.interceptor.axesMode[index] in ('', 'interceptor')):
      pass
    elif self.interceptor.axesMode[index] == 'injector':
      if signal_candidate == 0:
        signal_candidate = signal
    elif self.interceptor.axesMode[index] == 'adder':
      signal_candidate = signal + signal_candidate

    return signal_candidate

  def override_button(self, signal, index, values=(True, False)):
    if (not self.enabled
        or len(self.interceptor.buttons) < index + 1):
      return signal

    if self.interceptor.buttons[index]:
      signal_candidate = values[0]
    else:
      signal_candidate = values[1]

    return signal_candidate
