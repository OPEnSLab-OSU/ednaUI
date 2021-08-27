---
layout: page
title: Initial Steps
permalink: /
nav_order: 1
---

## How to connect to the eDNA UI

The eDNA sampler is likely off, so make sure first that the battery is plugged in and the switch on the side of the electronics box has been flipped. LEDs will light up to indicate that the machine is powered on. Next, check on your laptop or computer for a WiFi network called `ednaServer`, and connect to it. The default password is `password`, which can be changed by following the guide in <a href="/ednaUI/firmware-installation"> firmware-installation</a>. From there, navigate to a web browser and go to `192.168.1.1`.


## Initial steps

The first thing to do with the UI is set the RTC of the sampler, which can be found under utilities. This should be done anytime there is a timezone change as well.

Remember that to get updates on status and sensor data to be on the monitoring tab. The top right corner keeps track of the last status update, as well as whether the battery is running low or not.

<img src="images/battery_status_update.png" alt="Battery status and time since last update">

## Additional resources

We have a<a herf="https://www.youtube.com/playlist?list=PLGLI7V_o5-ajbo-sCwobR70pfw0TaJPEW"> youtube playlist </a>for hardware documentation that is useful for the user. This includes documentation for things like removing the SD card, replacing tubing, and removing the battery.

We also have<a href="https://drive.google.com/drive/folders/149ZBGu_K0_FZGF2qyQsjEpgiQDiWyY6b?usp=sharing"> videos </a>that go over both the UI and how to do Firmware updates.
