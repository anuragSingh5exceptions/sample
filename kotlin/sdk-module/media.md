---
sidebar_position: 3
---
# Media
Our Media module stands out as a potent tool for efficient and secure management and sharing of your image and video content. This module streamlines the process of uploading multimedia files to cloud storage, offering a hassle-free experience.

**Primary Benefit**
- Seamlessly integrates with your workflow through its user-friendly API, reducing the need for manual database management.
- Eliminates the complexities of setting up databases and managing servers, allowing you to focus on your core tasks

### Adding the module
Include the following dependency in your Gradle file 
```swift
implementation 'com.github.Truvideo:truvideo-sdk-android-media:0.2.02'
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
### Upload Media
`TruvideoSdkMedia` is a single class containing all functions required to manage the media module these are the methods required:
- `upload(context,filePathUri, TruvideoSdkUploadCallback)`: uploadFile function upload file i.e. photo or video by taking context, URI of the local file path, and TruvideoSdkUploadCallback as input in the callback it provides the status as onComplete, onError, onProgressChanged. 
```kotlin
import com.truvideo.sdk.media.TruvideoSdkMedia

fun uploadFile(context: Context, filePath: String){
    TruvideoSdkMedia.upload(
        context,
        android.net.Uri.parse(filePath),
        object : TruvideoSdkUploadCallback {
            // id in each function is the id of the media and it will be useful for canceling the media upload
            override fun onComplete(id: String, url: String) {
            // URL will be the image link 
            }

            override fun onError(id: String, ex: TruvideoSdkException) {
            }

            override fun onProgressChanged(id: String, progress: Int) {
            // progress gives the status of the uploaded percentage 
            }
        }
    )
}
```
### Transcription
Our transcriptions module simplifies video transcription. Upload videos effortlessly, initiate transcription, and retrieve results seamlessly, it's ideal for content management, media monitoring, and educational platforms. 
```kotlin
import com.truvideo.sdk.media.TruvideoSdkMedia

suspend fun uploadFile(filePath: String) {
    // Create a file upload request builder
    val builder = TruvideoSdkMedia.FileUploadRequestBuilder(filePath)
    
    // Tags
    builder.addTag("key", "value")
    builder.addTag("color", "red")
    builder.addTag("order-number", "123")

    // Metadata
    val metadata = mapOf<String, Any?>(
        "key" to "value",
        "numeric" to 1,
        "nested" to mapOf<String, Any?>(
            "key1" to "value1",
            "key2" to "value2"
        )
    )
    builder.setMetadata(metadata)

    // Build the request
    val request = builder.build()

    // Upload the file
    request.upload(object : TruvideoSdkMediaFileUploadCallback {
        override fun onComplete(id: String, response: TruvideoSdkMediaFileUploadRequest) {
            // Handle completion
            val url = response.url
            val transcriptionURL = response.transcriptionUrl
            val tags = response.tags
            val metadata = response.metadata
        }

        override fun onProgressChanged(id: String, progress: Float) {
            // Handle progress
        }

        override fun onError(id: String, ex: TruvideoSdkException) {
            // Handle error
        }
    })
}
```
### Cancel Media
- cancel(context, id): this will cancel the ongoing upload if it is not required to be uploaded it will take the context and ID of the file as input
```kotlin
import com.truvideo.sdk.media.TruvideoSdkMedia

fun cancelUpload(context: Context, id: String){
    // cancel upload
    TruvideoSdkMedia.cancel(context, id)
}
```
- `cancel(context, id, TruvideoSdkCancelCallback)`: this will cancel the ongoing upload if it is not required to be uploaded it will take the context and ID of the file as input with callback of onError and onReady.
```kotlin
import com.truvideo.sdk.media.TruvideoSdkMedia

fun cancelUpload(context: Context, id: String){
    // cancel upload with callback
    TruvideoSdkMedia.cancel(context, id,object : TruvideoSdkCancelCallback{
        override fun onError(id: String, ex: TruvideoSdkException) {
        
        }

        override fun onReady(id: String) {
        }
    })

}
```




