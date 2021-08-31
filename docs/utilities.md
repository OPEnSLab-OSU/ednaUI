---
layout: page
title: Utilities
permalink: /utilities
---

# **Utilities**

----


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## HyperFlush

HyperFlush is mainly used for cleaning out the system. The cleaning protocol is in<a href="/ednaUI/cleaning"> cleaning</a>.


## Update RTC

Updating the RTC is needed to make sure that the time on the sampler matches your local time, so scheduling a task will remain accurate. It's recommended upon first receiving the device, when there is a daylight saving change, or when you move between timezones.


## Reset Valves

Resetting valves is needed when valves have been sampled that you want to be sampled again. The code doesn't let you sample a valve mulitple times without being reset to prevent messing up a sample.

## Alcohol Bubble Purge (for samplers with alcohol bags over alcohol containers)

This utility turns the pump on and sets the alcohol valve to high for 10 seconds, which runs some alcohol through the system and removes air bubbles from the alcohol bag. Often it helps to use multiple times.