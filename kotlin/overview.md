---
sidebar_position: 1
id: intro
title: Java Introduction
sidebar_label: Introduction
---
# Overview
## Get Started with TruVideo SDK
The Truvideo Software Development Kit (SDK) is a comprehensive library designed to support various features related to photos, videos, and media transcription. Comprising several independent packages, each module offers distinct functionalities that end users can leverage based on their specific requirements While these modules are designed for independent operation, the core module is essential for the overall functionality of the SDK.
- Core - This module is fundamental for authenticating users across all other modules. Without it, authentication errors occur in different modules.
- Camera - This module provides an interface to access the device camera, enabling users to capture photos and videos. It then saves them in the app's storage package and returns the file path for further user utilization.
- Media - The media module offers cloud-based functionalities for managing media, such as uploading photos or videos on the server and obtaining their respective links. Additionally, it facilitates canceling uploads midway if the media isn't required to be uploaded.
- Video - The video module provides functionalities for editing videos, including trimming, rotation, concatenation, merging, and various other features.

![Docusaurus logo](/img/overview_img.png)

For hassle-free management of photos, video capture, and managing media our sdk provides you with industry-leading tools including video editing features.
### Key Features:
- Seamless integration with existing software systems.
- Ensures optimal performance and reliability.
### Note:
- The SDK's modular structure enables users to select and integrate specific functionalities as required.
- The core module serves as the foundation for the entire SDK, facilitating smooth operation for all included packages.
### Specification 
Minimum OS version:- Android 8.0 (API level 26) and later.            
