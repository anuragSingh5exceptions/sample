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
### Adding Module
Add a dependency for the core module in Swift Package Manager.
```md
https://github.com/Truvideo/truvideo-sdk-ios-video.git
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

### Video Info
This function gives you all the important details about a video, like its resolution, duration, codec, and other useful metadata.
```swift
import TruvideoSdkVideo
// Function to fetch information about multiple videos
func getVideoInfo(videos: [URL]) async {
    do {
        // Call TruvideoSdkVideo to retrieve information about the videos
        let result = try await TruvideoSdkVideo.getVideosInformation(videos: videos)
    } catch {
        // Handle any errors that might occur during the process
    }
}
```
### Compare Video
This function checks if multiple videos are compatible for concatenation, returning true if they have matching characteristics and false if they need merging.
```swift
import TruvideoSdkVideo
// Function to determine if videos can be concatenated
func canConcatVideos(videos: [URL]) async -> Bool {
    do {
        // Check if the videos can be concatenated using TruvideoSdkVideo
        let isConcat = try await TruvideoSdkVideo.canProcessConcatWith(videos: videos)
        return isConcat
    } catch {
        // If an error occurs, return false indicating concatenation is not possible
        return false
    }
}
```
### Edit Video
This function initiates video editing by creating a preset with the input video URL and the desired output URL. It then presents the `TruvideoSdkVideoEditorView` with the preset, allowing users to perform editing actions. Upon completion, it provides the result of the edited video.
```swift
import TruvideoSdkVideo
func edit(video: URL, output: URL) {
        // Create a TruvideoSdkVideoEditorPreset with input and output URLs
        let preset = TruvideoSdkVideoEditorPreset(
            videoURL: video,
            outputURL: output
        )
        
        // Present the TruvideoSdkVideoEditorView with the preset and handle the result
        self.presentTruvideoSdkVideoEditorView(preset: preset) { trimmerResult in
            // Print a success message along with the trimmer result
            print("Successfully edited", trimmerResult)
        }
    }

```
### Thumbnail
This function asynchronously generates a thumbnail for a given video using the TruvideoSdkVideo's thumbnailGenerator. It accepts a TruvideoSdkVideoThumbnailInputVideo object as input, which encapsulates the necessary information about the video.
```swift
import TruvideoSdkVideo
// Function to generate a thumbnail for a video asynchronously
    func createThumbnail(video: TruvideoSdkVideoThumbnailInputVideo) async {
        do {
            // Generate a thumbnail for the provided video using TruvideoSdkVideo's thumbnailGenerator
            let result = try await TruvideoSdkVideo.thumbnailGenerator.generateThumbnail(for: video)
        } catch {
            // Handle any errors that occur during the thumbnail generation process
        }
    }
```
### Clean noise 
This function asynchronously utilizes TruvideoSdkVideo's engine to clean noise from a specified video file located at the given input URL. The cleaned video is then saved to the provided output URL.
```swift
import TruvideoSdkVideo
// Function to asynchronously clean noise from a video file
func cleanNoise(video: URL, output: URL) async {
    do {
        // Attempt to clean noise from the input video file using TruvideoSdkVideo's engine
        let result = try await TruvideoSdkVideo.engine.clearNoiseForFile(
            at: video,
            outputURL: output
        )
    } catch {
        // Handle any errors that occur during the noise cleaning process
    }
}
```
### Concat Video
This function concatenates multiple videos into a single video file. First, it checks if the videos can be concatenated by calling the canConcatVideos function. If the videos are compatible, it proceeds to concatenate them using the ConcatBuilder. Finally, it prints the output path of the concatenated video.
:::note
1. Concatenation necessitates uniform characteristics across all provided videos, including resolution, audio codec, video codec, and pixel format.
2. Any discrepancies in these characteristics may lead to exceptions during the concatenation process.
3. To verify compatibility, it's advisable to use the compare method mentioned earlier to ensure the videos meet the necessary criteria before concatenation.
:::
```swift
import TruvideoSdkVideo
 func concatVideos(videos: [URL], outputUrl: URL) async {
        do {
            // Check if the videos can be concatenated
            let isConcat = await self.canConcatVideos(videos: videos)
            
            // If videos are compatible for concatenation
            if isConcat {
                // Concatenate the videos using ConcatBuilder
                let builder = TruvideoSdkVideo.ConcatBuilder(videos: videos, outputURL: outputUrl)
                // Print the output path of the concatenated video
                let result = builder.build()
                do{
                   let output = try? await result.process()
                    await print("Successfully concatenated", output)
                }
               
            }
        } 
    }
```
### Merge Video
The mergeVideos function combines several videos into one file. Unlike just sticking them together, this method reprocesses the videos, which might take longer. The merged video could end up with different qualities to fit all the originals. Unlike a simple join, this method lets you mix videos without any specific limitations, giving you more options.

:::note
1. Any video resolution can be merged without causing errors.
2. Unlike the concatenate method, this process involves reprocessing the videos, which might slow things down, especially on slower devices.
3. The resulting video's resolution is automatically adjusted to make sure it plays properly.
:::
```swift
import TruvideoSdkVideo
  // Function to merge multiple videos into a single video file
    func mergeVideos(videos: [URL], outputUrl: URL) async {
        // Create a MergeBuilder instance with specified parameters
        
        let builder = TruvideoSdkVideo.MergeBuilder(videos: videos, width: 320, height: 640, videoCodec: .h264, audioCodec: .mp3, framesRate: .fiftyFps, outputURL: outputUrl)
        let result = builder.build()
        do{
           let output = try? await result.process()
            await print("Successfully concatenated", output)
        }
        // Print the output path of the merged video
    }
```
### Encode Video
This function constructs a TruvideoSdkVideoRequest to carry out an encoding operation. This operation enables modifications to a video by altering one or more of its attributes, such as:
- Resolution via width and height parameters
- Video codec (options: .h264, .h265)
- Audio codec (options: .aac, .mp3, .ac3)
- Frame rate (options: 24fps, 25fps, 30fps, 50fps, 60fps)

```swift
import TruvideoSdkVideo
// Function to encode a video with multiple parameters
    func encodingVideo(videoUrl: URL,outputUrl: URL) async{
        // Create a EncodingBuilder instance with specified parameters
        let builder = TruvideoSdkVideo.EncodingBuilder(at: videoUrl, width: 320, height: 240, videoCodec: .h264, audioCodec: .mp3, framesRate: .sixtyFps, outputURL: outputUrl)
        let result = builder.build()
        do{
           let output = try? await result.process()
            // Print the output path of the concatenated video
          print("Successfully concatenated", output)
        }
       
    }
```



