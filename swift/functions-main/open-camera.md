--- 
sidebar_position: 3
---
# Open camera
**Description**

The `start` function is used to open a camera preview with complete control of how you are willing to use it by providing specific functions

**Syntax**
```swift
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
viewController.presentTruvideoSdkCameraView(
                    preset: configuration,
                    onComplete: { cameraResult in
                        // Handling completion of camera 
                        }
                        )
```

**Return value**

None

**Example**
```swift
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
