---
layout: page
title: Firmware Installation
permalink: /firmware-installation
---

# **Firmware Installation**

----

Please follow these steps to reinstall the firmware

## Required Toolings

1. Install VSCode
2. Install PlatformIO extension `platformio.platformio-ide`

## Clone Git Repository

1. The following code clone development git repo to your local computer

    ```bash
    git clone https://github.com/OPEnSLab-OSU/ednaServer 
    cd ednaServer
    ```

2. Initialize git submodule. This will pull in another git repo that the server relies on.

   ```bash
    git submodule init
    git submodule update
    git submodule foreach "git checkout develop"
    code .
   ```

3. You should now have VSCode opened automatically. Next, click on `platformio.ini` configuration file located in the file explorer.

    <div align="center">
        <img src="images/platformio_ini_sidebar.png" width="300px" style="border-radius: 4px">
    </div>

4. Next, please comment the `[env:debug]` section and uncomment `[env:live]`. The file should look like the following. Notice that we have `;` in front of the commented line.

    ```bash
    ;[env:debug]
    ; build_type = debug
    ;build_unflags = -std=gnu++11
    ;build_flags = -D DEBUG=1 -Wall -Wno-unknown-pragmas -std=c++14

    ; [env:release]
    ; build_unflags = -std=gnu++11
    ; build_flags = -D RELEASE=1 -Wall -Wno-unknown-pragmas -std=c++14

    [env:live]
    build_unflags = -std=gnu++11
    build_flags = -D LIVE=1 -Wall -Wno-unknown-pragmas -std=c++14
    ```

5. `optional` Optionally you can change the server name and password by going to `src/configuration.hpp`. Otherwise, the server will default to the following values:

    ```c++
    #define SERVER_NAME     "ednaServer"
    #define SERVER_PASSWORD "password"
    ```

6. We are now ready to upload the firmware to the micro-controller. Please click on the `right-arrow` button located at the bottom of the status bar.
   <div align="center">
        <img src="images/platformio_menu.png" width="300px" style="border-radius: 4px">
    </div>
