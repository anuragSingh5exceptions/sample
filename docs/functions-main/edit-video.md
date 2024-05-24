--- 
sidebar_position: 4
---
# Edit Video
**Description**

The `openEditScreen` open video in editing screen after that on editing complete it return the status of onReady

**Syntax**
```kotlin
openEditScreen(videoUri, resultPath, truvideoSdkVideoEditCallback)
```
`videoUri` (required) Uri :
    Uri path of video 

`resultPath` (required) String :
   Path where you want to save the new video

`truvideoSdkVideoEditCallback` (required) Class :
   An instance of a class that implements the TruvideoSdkVideoEditCallback interface.

**Return value**

None

**Events**

onReady()

**Example**
```kotlin
fun editVideo(context: Context, videoUri: Uri, resultPath: String) {
    TruvideoSdkVideo.openEditScreen(videoUri,resultPath,object :
       TruvideoSdkVideoEditCallback{
       override fun onReady(path: String?) {
          // get path as a result 
       }
    })

}  
```

