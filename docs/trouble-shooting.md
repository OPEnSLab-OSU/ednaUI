---
layout: page
title: Trouble Shooting
permalink: /trouble-shooting
---

# **Trouble Shooting**

----

<details open markdown="block">
  <summary>
    Documented Problems
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>


## SD file corruption

- What causes this?

It's possible that if power is interrupted to the sampler while it is writing to a SD file, meaning that file won't be written to properly. 

- What does this problem look like?

If the sampler doesn't work on start up and seems to freeze (lights aren't blinking, UI can't be connected to), then it is possible that this problem is occurring

- How to resolve this issue?

The easiest way to resolve this issue is to remove all files from the SD card and then put on new files. You may also run the sampler through debug mode following the firmware installation guide, and then check the serial monitor for when the sampler says there is an error.

## UI redirecting to https (Firefox)
- What causes this?

By default, Firefox attempts to connect websites using the HTTPS protocol, which is not supported by the eDNA sampler.

- What does this problem look like?

When trying to connect to `192.168.1.1`, you are automatically redirected to `https://192.168.1.1`, and can't connect to the UI

- How to resolve this issue?

Go to `about:config` (same as entering any web address), then search for `network.stricttransportsecurity.preloadlist` and make it set to false. Then, search for `browser.fixup.fallback-to-https` and set to false as well.

## Task only completes some valves
- What causes this?

We are currently analyzing our task protocol to determine the reason for this

- What does this problem look like?

When a task is set to sample a large number of valves (6+), often the task will only complete a few valves and then get stuck

- How to resolve this issue?

Currently, we recommend setting tasks to around 4 valves maximum, and making multiple tasks if you want more valves sampled.