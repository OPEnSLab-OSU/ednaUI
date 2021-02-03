---
layout: page
title: ednaUI Documentation
permalink: /
---


## Initial steps

The first thing to do with the UI is set the RTC of the sampler, which can be found under utilities. This should be done anytime there is a timezone change as well.

Remember that to get updates on status and sensor data to be on the monitoring tab. The top left corner keeps track of the last status update, as well as whether the battery is running low or not.

<img src="images/battery_status_update.png" alt="Battery status and time since last update">

## Setting Tasks

Tasks are set and scheduled in the tasks tab. A task that is scheduled for the future is an active task, and a task that has ran is an inactive task.

Remember that after a task runs that the assigned valves become greyed-out. Under the utilities tab, use "reset valves" if you want to use a valve again.

### Recommended Settings For a Task

Keep the time between for valves to 10 seconds. 
Flush time should be 60 seconds.
The motor intakes about 350ml/min, so set the sample time and sample volume accordingly. If the time is too low, the sampling will stop before it reaches the volume. 
Pressure should be 25 psi.
Dry time should be 15 seconds.
Preserve time should be 15 seconds.

<br>

## How to clean the system

Under utilities, there is an option called "hyperflush". With all connections put into a bleach container, run hyperflush 3 times. Then, put the intake into a water source and the other connections into a sink or disposal system. Run hyperflush again at least 3 times.