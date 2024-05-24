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
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo

public void  getVideoInfo(Context context,String path){
   // Get video info as TruvideoSdkVideoInformation
   TruvideoSdkVideo.getInfo(path,new TruvideoSdkVideoGetVideoInfoCallback(){
       @Override
       public void onError(@NonNull TruvideoSdkException e) {
          
       }

       @Override
       public void onReady(@NonNull TruvideoSdkVideoInformation truvideoSdkVideoInformation) {
          
       }
   });
}
```
### Compare Video
- `compare(videoUris, TruvideoSdkVideoAreVideosReadyToConcatCallback)`: this function compares multiple videos and returns the boolean accordingly as the concat video needs to have the same characteristics i.e. if the boolean is true videos are compatible with concat otherwise not compatible videos need to merge in that case.
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo
public void compareVideos(Context context,List<String> videoUris){
   // compare videos and return true or false if they are ready to concat
   TruvideoSdkVideo.compare( videoUris,new TruvideoSdkVideoAreVideosReadyToConcatCallback(){
       @Override
       public void onError(@NonNull TruvideoSdkException e) {

       }

       @Override
       public void onReady(boolean b) {

       }
   });
}
```
### Edit Video
Edit consists of 2 steps initialize and the edit will open the screen to edit the video 
- `TruvideoSdkVideo.initEditScreen(context)`: On Android, the SDK needs to be initialized to function properly. To achieve this, you should add the following code snippet inside the onCreate method of the activity that will invoke the video edit
```swift
import com.truvideo.sdk.camera.TruvideoSdkCamera

public class YourActivity extends AppCompatActivity{
    @Override 
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TruvideoSdkVideo.initEditScreen(this)
        //...rest of your code
    }
}
```
- `openEditScreen(videoUri, resultPath, truvideoSdkVideoEditCallback)`: After the module is initialized, you can invoke this method for video editing using the following approach.
This will return the path as a result when file is ready 
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo
import com.truvideo.sdk.video.interfaces.TruvideoSdkVideoEditCallback

public void editVideo(ComponentActivity context,String videoUri,String resultPath) {
   // Edit video and save to resultPath
   TruvideoSdkVideo.openEditScreen(videoUri,resultPath,new TruvideoSdkVideoEditCallback(){
       @Override
       public void onReady(@Nullable String s) {

       }
   });
}
```
### Thumbnail
Preview of video is crucial, thumbnail generation gives you the preview image from the timeframe you need. 
- `createThumbnail(videoPath,resultPath, position, width, height)`: this method takes the video path, result path, position, width, and height as input and places the image at the resulting path.
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo
public void generateThumbnail(String videoPath,String resultPath){
   try{
       // Generate thumbnail and save to resultPath
       TruvideoSdkVideo.getInstance().createThumbnail(videoPath, resultPath, 1000, null, null, new TruvideoSdkVideoThumbnailCallback() {
           @Override
           public void onReady(@NonNull String s) {
             // thumbnail generated successfully
           }

           @Override
           public void onError(@NonNull TruvideoSdkException e) {
               // thumbnail generation failed
           }
       });
   }catch (Exception e){
       // Handle exception
       Log.d("TAG", "generateThumbnail: error");
   }
}
```
### Clean noise 
We are utilizing high-level Artificial intelligence for noise cancellation over the input video. It’s useful for video containing background noises.
- `clearNoise(videoPath, resultPath, callback)`: This function takes video path, result path,and callback of TruvideoSdkVideoClearNoiseCallback type and places a new video to the resulting path after clearing noise.
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo
public void cleanNoise(Context context,String videoPath,String resultPath){
   // Clean noise from video and save to resultPath
   TruvideoSdkVideo.getInstance().clearNoise(videoPath, resultPath,new TruvideoSdkVideoClearNoiseCallback(){
       @Override
       public void onReady(@NonNull String s) {

       }

       @Override
       public void onError(@NonNull TruvideoSdkException e) {

       }
   });
}
```
### Concat Video
- `ConcatBuilder(videoUris,resultPath)`: Concatenation uses a specific algorithm to merge multiple videos one after another to make one video efficiently and make a completely new video. This method takes the video URIs list, and result path to place a new video and place the video at the given result path.
:::note
- There are certain restrictions for concat to work, all the provided videos should be of the same character such as resolution, audio codec, video codec, pixel format, and many more. The difference could raise an exception. 
- To check whether videos are compatible use compare method first given above.
:::
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo
public void concatVideos(Context context,List<String> videoUris,  String resultPath){
   // concat videos and save to resultPath
    TruvideoSdkVideoConcatBuilder builder = TruvideoSdkVideo.getInstance().ConcatBuilder(videoUris, resultPath);
    builder.build(new TruvideoSdkVideoBuilderCallback() {
        @Override
        public void onReady(@NonNull TruvideoSdkVideoRequest truvideoSdkVideoRequest) {
      
        }

        @Override
        public void onError(@NonNull TruvideoSdkException e) {

        }
    });
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
```swift
import com.truvideo.sdk.media.TruvideoSdkVideo;

public void mergeVideos(Context context,List<String> videoUris,String resultPath){
   // merge videos and save to resultPath the can be of any format
   TruvideoSdkVideoMergeBuilder builder = TruvideoSdkVideo.getInstance().MergeBuilder(videoUris,resultPath);
   builder.setHeight(640);
   builder.setWidth(480);
   builder.setVideoCodec(TruvideoSdkVideoVideoCodec.h264);
   builder.setFramesRate(TruvideoSdkVideoFrameRate.fiftyFps);
   builder.build(new TruvideoSdkVideoBuilderCallback() {
       @Override
       public void onReady(@NonNull TruvideoSdkVideoRequest truvideoSdkVideoRequest) {
           // Video merged successfully
       }

       @Override
       public void onError(@NonNull TruvideoSdkException e) {
           // Video merge failed
       }
   });

}
```
### Encode Video
This function constructs a TruvideoSdkVideoRequest to carry out an encoding operation. This operation enables modifications to a video by altering one or more of its attributes, such as:
- Resolution via width and height parameters
- Video codec (options: .h264, .h265)
- Audio codec (options: .aac, .mp3, .ac3)
- Frame rate (options: 24fps, 25fps, 30fps, 50fps, 60fps)

```swift
import com.truvideo.sdk.media.TruvideoSdkVideo

public void encodeVideo(Context context,String videoUris,String resultPath){
   TruvideoSdkVideoEncodeBuilder builder = TruvideoSdkVideo.getInstance().EncodeBuilder(videoUris,resultPath);
   builder.setVideoCodec(TruvideoSdkVideoVideoCodec.h264);
   builder.setFramesRate(TruvideoSdkVideoFrameRate.fiftyFps);
   builder.setHeight(640);
   builder.setWidth(480);
   builder.build(new TruvideoSdkVideoBuilderCallback() {
       @Override
       public void onReady(@NonNull TruvideoSdkVideoRequest truvideoSdkVideoRequest) {
           // Video encoded successfully
       }

       @Override
       public void onError(@NonNull TruvideoSdkException e) {
           // Video encode failed
       }
   });
}
```



