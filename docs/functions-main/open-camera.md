--- 
sidebar_position: 3
---
# Open camera
**Description**

The `start` function is used to open a camera preview with complete control of how you are willing to use it by providing specific functions

**Syntax**
```kotlin
start()
```
`lensFacing` (required) Enum :
    It is an enum of TruvideoSdkCameraLensFacing type 
`flashMode` (required) Enum :
   It is an enum of TruvideoSdkCameraFlashMode type
`orientation` (required) Enum :
   It is an enum of TruvideoSdkCameraOrientation type 

`outputPath` (required) String :
   If need to change the output path provide that 

`frontResolutions` (required) List&lt;TruvideoSdkCameraResolution&gt;

`frontResolution` (required) TruvideoSdkCameraResolution

`backResolutions` (required) List&lt;TruvideoSdkCameraResolution&gt;

`backResolution` (required) TruvideoSdkCameraResolution

`videoCodec` (required) Enum :
   It is an enum of TruvideoSdkCameraVideoCodec type 

`mode` (required) Enum :
   It is an enum of the TruvideoSdkCameraMode type 


**Return value**

None


**Events**

onResult()

**Example**
```kotlin
fun openCamera() {
   TruvideoSdkCamera.start(
       //This configuration parameter changes the camera config
       configuration = TruvideoSdkCameraConfiguration(
           TruvideoSdkCameraLensFacing.BACK,
           TruvideoSdkCameraFlashMode.OFF,
           null,
           "",
           listOf(),
           null,
           listOf(),
           null,
           TruvideoSdkCameraVideoCodec.H264,
           TruvideoSdkCameraMode.VIDEO_AND_PICTURE
       ),
       // callback return list TruvideoSdkCameraMedia from which you can get the file path
       callback = object : TruvideoSdkCameraCallback {
           override fun onResult(media: List<TruvideoSdkCameraMedia>) {
               // media is a list of captured images and videos 
           }
       }
   )
}
```
