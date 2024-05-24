---
sidebar_position: 2
---
# Camera
The camera module helps to make camera app development easier, It provides consistency and an easy-to-use API for capturing images, videos and storing them.

**Primary Use Cases**
It improves the developer experience in several key ways.
- Handle the entire process of capturing and storing so that the developer focus more on the coding part 
- Giving more control over the camera by changing some parameters, even control over orientation 
- Support multiple captures of photos and video in a single time

**Ease of use** 
It allows you to focus on the task you need to get done instead of managing device-specific nuances.Most common camera use cases are supported:
- Image Capture: Save the Image
- Video Capture: Save video and audio

### Adding Module
Add a dependency for the core module in Swift Package Manager.
```md
https://github.com/Truvideo/truvideo-sdk-ios-camera.git
```
To add a dependency for the core module in Swift Package Manager, follow these steps:

1. Open your Xcode project.
2. Navigate to the "File" menu and select "Swift Packages" -> "Add Package Dependency..."
3. In the dialog that appears, enter the URL of the package repository containing the core module.
4. In the next step, you'll be prompted to choose the version, branch, or commit of the package you want to use. Select the appropriate option and click "Next."
5. Xcode will then resolve the package and its dependencies.
6. In the "Add package product to your App" dialog, make sure that the core module is selected and added to your app's target.
7. Click on the "Finish" button to add the dependency.

For detailed instructions, you can refer to the Swift Package Manager documentation provided by Apple [here](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app).

### Required permissions
For accessing the camera and microphone in the iOS app, you have  to include some of the necessary permissions in your Info.plist file. Here are the basic steps:
1. Open your Xcode project.
2. Locate the Info.plist file in the Project Navigator.
3. Right-click on the Info.plist file and select "Open As" &gt; "Source Code".
4. Add the following keys and descriptions inside the &lt;dict&gt; tag:
```md
<key>NSCameraUsageDescription</key>
<string>We need access to your camera to capture photos.</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone to record audio.</string>
```
5. Save the Info.plist file and switch back to the standard editor view if necessary.

For detailed instructions, you can refer to Apple's official documentation “Requesting authorization to capture and save media“ [here](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app).


### Camera Initialization
To initialize the camera, import the `TruvideoSdkCamera` module into the controller first. Next, customize the camera settings by utilizing `TruvideoSdkCameraConfiguration` with appropriate parameters to tailor it to your specific requirements.

Once the configuration is complete, proceed to display the camera view for capturing photos and clips.

```swift
import TruvideoSdkCamera

 /**
     Initiates the camera functionality with specified parameters and presents the camera view.
     - Parameters:
        - viewController: The UIViewController where the camera view will be presented.
        - completion: A closure to handle the camera result upon completion.
            - cameraResult: The result of the camera operation.
     */
    func cameraInitiate(viewController: UIViewController, _ completion: @escaping (_ cameraResult: TruvideoSdkCameraResult) -> Void) {
        DispatchQueue.main.async {
            // Retrieving information about the device's camera functionality.
            let cameraInfo: TruvideoSdkCameraInformation = TruvideoSdkCamera.camera.getTruvideoSdkCameraInformation()
            
            // Configuring the camera with various parameters based on specific requirements.
            // - Parameter outputPath: Specifies the path for storing the captured data upon completion.
            // Additional parameters can be adjusted to customize camera behavior as needed.
            let configuration = TruvideoSdkCameraConfiguration(
                lensFacing: .back,
                flashMode: .off,
                orientation: nil,
                outputPath: "",
                frontResolutions: [],
                frontResolution: nil,
                backResolutions: [],
                backResolution: nil,
                videoCodec: .h264,
                mode: .videoAndPicture
            )
            
            DispatchQueue.main.async {
                viewController.presentTruvideoSdkCameraView(
                    preset: configuration,
                    onComplete: { cameraResult in
                        // Handling completion of camera
                    }
                )
            }
        }
    }
```

### Augmented Reality (AR) [BETA]
Introducing the beta version of Augmented Reality (AR) functionality within the TruvideoSDK! This feature brings the power of augmented reality directly into your app, offering users an immersive and interactive experience like never before. To activate this feature, simply call the presentTruvideoSdkAugmentedRealityCameraView method from any UIViewController instance in your app.

Once invoked, users will be transported into the AR camera view, where they can capture stunning AR content, whether it's captivating images or engaging videos. 

Upon completion of the AR session, a callback function is triggered, passing along a `TruvideoSdkCameraResult`. This allows seamless integration of the captured AR content back into your app, enabling further processing or integration with existing features.
```swift
import TruvideoSdkCamera

viewController.presentTruvideoSdkAugmentedRealityCameraView(
    onComplete: { cameraResult in
        // Handle result of type TruvideoSdkCameraResult
    })
```
### Entities
**Preset**

`TruvideoSdkCameraConfiguration` is a public class that encapsulates the configuration parameters for the TruvideoSDK camera. It includes settings such as the lens facing direction (front or back), flash mode, video orientation, output path for saved content, preferred video codec, and camera mode. This structure allows developers to customize camera behavior and output format to suit specific application requirements
```swift
public struct TruvideoSdkCameraConfiguration : Decodable {
    public let lensFacing: TruvideoSdkCamera.TruvideoSdkCameraLensFacing
    public let flashMode: TruvideoSdkCamera.TruvideoSdkCameraFlashMode
    public let orientation: TruvideoSdkCamera.TruvideoSdkCameraOrientation?
    public let outputPath: String
    public let videoCodec: TruvideoSdkCamera.TruvideoSdkCameraVideoCodec
    public let mode: TruvideoSdkCamera.TruvideoSdkCameraMode
}
```
**Camera information**
`TruvideoSdkCameraInformation` defines a structure holding information about available camera devices within the TruvideoSDK. It contains references to both front and back cameras, providing details such as device ID, lens facing direction, supported resolutions, flash availability, tap-to-focus capability, and sensor orientation. Developers can utilize this data to dynamically configure camera options and tailor the user experience accordingly.
```swift
public struct TruvideoSdkCameraInformation {
    public let frontCamera: TruvideoSdkCamera.TruvideoSdkCameraDevice?
    public let backCamera: TruvideoSdkCamera.TruvideoSdkCameraDevice?
}

public struct TruvideoSdkCameraDevice {
    public let id: String
    public let lensFacing: TruvideoSdkCamera.TruvideoSdkCameraLensFacing
    public let resolutions: [TruvideoSdkCamera.TruvideoSdkCameraResolution]
    public let withFlash: Bool
    public let isTapToFocusEnabled: Bool
    public let sensorOrientation: Int
}
```
**Camera Information**
`TruvideoSdkCameraResolution` is a class representing a specific resolution supported by a camera device. It includes attributes for width and height, allowing developers to ascertain available resolution options when configuring camera settings within their applications.
```swift
public class TruvideoSdkCameraResolution {
    public let width: Int32
    public let height: Int32
}
```

**Lens Facing**

`TruvideoSdkCameraLensFacing` enum represents the two possible directions of a camera lens: back or front.
```swift
public enum TruvideoSdkCameraLensFacing {
    case back
    case front
}
```
**Flash Mode**

`TruvideoSdkCameraFlashMode` enum defines two flash modes: off and on, offering developers control over flash functionality during media capture.
```swift
public enum TruvideoSdkCameraFlashMode {
    case off
    case on
}
```
**Orientation**

`TruvideoSdkCameraOrientation` enum offers four orientation choices: portrait, landscapeLeft, landscapeRight, and portraitReverse, enabling developers to define camera orientation preferences for media capture.
```swift
public enum TruvideoSdkCameraOrientation {
    case portrait
    case landscapeLeft
    case landscapeRight
    case portraitReverse
}
```

**Camera Mode**

`TruvideoSdkCameraMode` enum includes three modes: video and picture, video, and picture, enabling developers to specify whether the camera should capture both video and pictures, only video, or only pictures, respectively.
```swift
public enum TruvideoSdkCameraMode {
    case videoAndPicture
    case video
    case picture
}
```

**Video Codec**

`TruvideoSdkCameraVideoCodec` enum defines two video codec options: h264 and h265, providing developers with choices for encoding video content within the TruvideoSDK.
```swift
public enum TruvideoSdkCameraVideoCodec {
    case h264
    case h265
}
```
**Output Data**

The results of TruvideoSDK camera operations, presenting an array of `TruVideoClip` instances for video content and `TruVideoPhoto` instances for photos. Each `TruVideoClip` object holds essential video attributes like URL, duration, existence status, orientation, and thumbnail. Meanwhile, `TruVideoPhoto` encapsulates photo details such as image data, metadata, and URL, along with optional cropped image data. This comprehensive data structure empowers developers to manage captured media seamlessly, facilitating integration and post-processing within their applications.
```swift
public struct TruvideoSdkCameraResult {
    public let clips: [TruvideoSdkCamera.TruVideoClip]
    public let photos: [TruvideoSdkCamera.TruVideoPhoto]
}

public class TruVideoClip {
  final public let id: UUID
  public var asset: AVAsset?
  public var duration: CMTime { get }
  public var fileExists: Bool { get }
  public var lastFrameImage: UIImage? { get }
  public var orientation: AVCaptureVideoOrientation? { get }
  public var size: Int64? { get }
  public var thumbnailImage: UIImage? { get }
  final public let url: URL
}

public struct TruVideoPhoto {
    public let id: UUID
    public static let DeviceOrientationKey: String
    public var croppedImage: UIImage? { get }
    public let croppedImageData: Data?
    public var image: UIImage? { get }
    public let imageData: Data?
    public let metadata: [String : Any]
    public let url: URL
}
```

