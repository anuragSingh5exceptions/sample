---
sidebar_position: 4
---
# Video
With easy-to-use API, the video module is a powerful tool developed to enhance and manipulate local multimedia videos. It makes complex video editing features available for developers without much coding some features are listed here: 
- AI-based Denoising: Utilizing high-level Artificial intelligence to reduce noise in video effectively.
- Thumbnail generation: Preview of video is crucial, thumbnail generation gives you the preview image from the timeframe you need.  
- Trimming: Split the video to your desired size and remove unwanted material.
- Rotating: Make a video to the right orientation you need
- Concat or Merge: Seamlessly combine multiple videos to make a single long video, to merge the video
- Video Information: Extract video information such as resolution, duration, codec information, and other relevant metadata 

**Primary Benefit**
It improves the developer experience in several key ways.
- Handle the entire process of editing features such as trimming, rotating
- Giving control over which feature you require by the single call of the function

**Ease of use** 
It allows you to focus on the task you need to get done such as 
- Thumbnail generation
- Clear noise
- Video Editing
### Adding the module
Include the following dependency in your Gradle file 
```xml
implementation 'com.github.Truvideo:truvideo-sdk-android-video:x.x.x'
```
Ensure the inclusion of the jitpack repository in the setting. gradle file

```swift
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        maven {
            url 'https://jitpack.io'
        }
    }
}
```
### Video Info
- `getInfo(path, TruvideoSdkVideoGetVideoInfoCallback)`: this function provides video info such as resolution, duration, codec information, and relevant metadata.
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo
suspend fun getVideoInfo(context: Context, path: String){

    TruvideoSdkVideo.getInfo(path,object : TruvideoSdkVideoGetVideoInfoCallback{

       override fun onError(exception: TruvideoSdkException) {

       }

       override fun onReady(truvideoSdkVideoInfo: TruvideoSdkVideoInformation) {

       }
    })
}
```
### Compare Video
- `compare(videoUris, TruvideoSdkVideoAreVideosReadyToConcatCallback)`: this function compares multiple videos and returns the boolean accordingly as the concat video needs to have the same characteristics i.e. if the boolean is true videos are compatible with concat otherwise not compatible videos need to merge in that case.
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo

fun compareVideos(context: Context, videoUris: List<String>){
   //Compare videos and return true or false if they are ready to concat
   TruvideoSdkVideo.compare( videoUris, callback = object : TruvideoSdkVideoAreVideosReadyToConcatCallback{
       override fun onError(exception: TruvideoSdkException) {

       }

       override fun onReady(boolean: Boolean) {
       }
   })
}
```
### Edit Video
Edit consists of 2 steps initialize and the edit will open the screen to edit the video 
- `TruvideoSdkVideo.initEditScreen(context)`: On Android, the SDK needs to be initialized to function properly. To achieve this, you should add the following code snippet inside the onCreate method of the activity that will invoke the video edit
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo;

class YourActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        TruvideoSdkVideo.initEditScreen(this)
        //...rest of your code
    }
}
```
- `openEditScreen(videoUri, resultPath, truvideoSdkVideoEditCallback)`: After the module is initialized, you can invoke this method for video editing using the following approach.
This will return the path as a result when file is ready 
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo
import com.truvideo.sdk.video.interfaces.TruvideoSdkVideoEditCallback

fun editVideo(context: Context, videoUri: Uri, resultPath: String) {
    TruvideoSdkVideo.openEditScreen(videoUri,resultPath,object :
       TruvideoSdkVideoEditCallback{
       override fun onReady(path: String?) {
          // get path as a result 
       }
    })

}
```
### Thumbnail
Preview of video is crucial, thumbnail generation gives you the preview image from the timeframe you need. 
- `createThumbnail(videoPath,resultPath, position, width, height)`: this method takes the video path, result path, position, width, and height as input and places the image at the resulting path.
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo

fun generateThumbnail(videoPath: String, resultPath: String){
   try{
       // Generate thumbnail and save to resultPath
       TruvideoSdkVideo.createThumbnail(
           videoPath = videoPath,
           resultPath = resultPath,
           position = 1000,
           width = null,
           height = null,
           callback = object : TruvideoSdkVideoThumbnailCallback{
               override fun onError(exception: TruvideoSdkException) {
                   // thumbnail generation failed
               }

               override fun onReady(path: String) {
                   // thumbnail generated successfully
               }
           }
       )
   }catch (exception: Exception){
       // Handle exception
       Log.d("TAG", "generateThumbnail: error")
   }
}
```
### Clean noise 
We are utilizing high-level Artificial intelligence for noise cancellation over the input video. It’s useful for video containing background noises.
- `clearNoise(videoPath, resultPath, callback)`: This function takes video path, result path,and callback of TruvideoSdkVideoClearNoiseCallback type and places a new video to the resulting path after clearing noise.
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo

fun cleanNoise(context: Context, videoPath: String, resultPath: String){
   // Clean noise from video and save to resultPath
   TruvideoSdkVideo.clearNoise(videoPath, resultPath,object : TruvideoSdkVideoClearNoiseCallback {
       override fun onError(exception: TruvideoSdkException) {

       }
       override fun onReady(path: String) {

       }
   })
}
```
### Concat Video
- `ConcatBuilder(videoUris,resultPath)`: Concatenation uses a specific algorithm to merge multiple videos one after another to make one video efficiently and make a completely new video. This method takes the video URIs list, and result path to place a new video and place the video at the given result path.
:::note
- There are certain restrictions for concat to work, all the provided videos should be of the same character such as resolution, audio codec, video codec, pixel format, and many more. The difference could raise an exception. 
- To check whether videos are compatible use compare method first given above.
:::
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo

fun concatVideos(context: Context, videoUris: List<String>, resultPath: String){
    // concat videos and save to resultPath
    TruvideoSdkVideo.ConcatBuilder(videoUris,resultPath).build(object : TruvideoSdkVideoBuilderCallback{
        override fun onError(exception: TruvideoSdkException) {
      
        }

        override fun onReady(request: TruvideoSdkVideoRequest) {
      
        }
    })
}
```
### Merge Video
- `MergeBuilder(videoUris,resultPath)`: Merge has the same functionality as concat to merge multiple videos to make one another video but there is an advantage over concat to merge all video does not have to be of same configuration. 
This method takes video URIs list, and result path to place a new video and place the video at the given result path.

:::note
- Any type of video resolution can be merged no exception will occur
- Unlike concat this method involves reencoding the input videos, making it less performant, and processing time may be considerable (depending on the device's processing power).
- It automatically calculates the resulting video resolution to ensure that all input videos can be displayed correctly.
:::
```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo
fun mergeVideos(context: Context, videoUris: List<String>, resultPath: String){
   // merge videos and save to resultPath the can be of any format
   // Build the merge builder
   val builder = TruvideoSdkVideo.MergeBuilder(videoUris,resultPath)
   // set configuration
   builder.height = 640
   builder.width = 480
   builder.framesRate = TruvideoSdkVideoFrameRate.fiftyFps
   builder.videoCodec = TruvideoSdkVideoVideoCodec.h264
   builder.build(object :TruvideoSdkVideoBuilderCallback{
       override fun onReady(request: TruvideoSdkVideoRequest) {
           // merge ready
       }

       override fun onError(exception: TruvideoSdkException) {
           // merge failed
       }
   })
}
```
### Encode Video
This function constructs a TruvideoSdkVideoRequest to carry out an encoding operation. This operation enables modifications to a video by altering one or more of its attributes, such as:
- Resolution via width and height parameters
- Video codec (options: .h264, .h265)
- Audio codec (options: .aac, .mp3, .ac3)
- Frame rate (options: 24fps, 25fps, 30fps, 50fps, 60fps)

```kotlin
import com.truvideo.sdk.media.TruvideoSdkVideo
suspend fun changeEncoding(context: Context, videoUri: String, resultPath: String){
   // Change encoding of video and save to resultPath
   // Build the encode builder
   val result = TruvideoSdkVideo.EncodeBuilder(videoUri,resultPath)
   result.height = 640
   result.width = 480
   result.framesRate = TruvideoSdkVideoFrameRate.fiftyFps
   result.videoCodec = TruvideoSdkVideoVideoCodec.h264
   result.audioCodec = TruvideoSdkCameraVideoCodec.aac

   // Process the encode builder
   result.build(object : TruvideoSdkVideoBuilderCallback{
       override fun onError(exception: TruvideoSdkException) {

       }

       override fun onReady(request: TruvideoSdkVideoRequest) {

       }
   })
}
```



