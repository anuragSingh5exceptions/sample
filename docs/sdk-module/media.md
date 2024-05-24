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
```swift
import com.truvideo.sdk.media.TruvideoSdkMedia
public void upload(Context context,String filepath){
   final String id = TruvideoSdkMedia.getInstance().upload(
           context,
           Uri.fromFile(new File(filepath)),
           new TruvideoSdkUploadCallback() {
               @Override
               public void onComplete(@NonNull String id, @NonNull String url) {

               }

               @Override
               public void onProgressChanged(@NonNull String id, int progress) {

               }

               @Override
               public void onError(@NonNull String id, @NonNull TruvideoSdkException ex) {

               }
           }
   );
}
```
### Transcription
Our transcriptions module simplifies video transcription. Upload videos effortlessly, initiate transcription, and retrieve results seamlessly, it's ideal for content management, media monitoring, and educational platforms. 
```swift
import com.truvideo.sdk.media.TruvideoSdkMedia;
private void uploadFile(String filePath) {
    // Create file upload request builder
    final TruvideoSdkMediaFileUploadRequestBuilder builder = TruvideoSdkMedia.getInstance().FileUploadRequestBuilder(filePath);
    // Tags
    builder.addTag("key", "value");
    builder.addTag("color", "red");
    builder.addTag("order-number", "123");
    // Metadata
    final Map<String, Object> metadata = new HashMap<>();
    metadata.put("key", "value");
    metadata.put("numeric", 1);
    final Map<String, Object> nestedMetadata = new HashMap<>();
    nestedMetadata.put("key1", "value1");
    nestedMetadata.put("key2", "value2");
    metadata.put("nested", nestedMetadata);
    builder.setMetadata(metadata)
    // Build request
    builder.build(request -> {
        // Here the request its ready to be used
        // Upload file
        request.upload(new TruvideoSdkMediaFileUploadCallback() {
            @Override
            public void onComplete(@NonNull String id, @NonNull TruvideoSdkMediaFileUploadRequest response) {
                // Handle complete upload
                String url = response.getUrl();
                String transcriptionUrl = response.getTranscriptionUrl();
                Map<String, String> tags = response.getTags();
                Map<String, Object> metadata = response.getMetadata();
            }
            @Override
            public void onProgressChanged(@NonNull String id, float progress) {
                // Handle progress upload
            }
            @Override
            public void onError(@NonNull String id, @NonNull TruvideoSdkException ex) {
                // Handle error upload
            }
        });
    });
}
```
### Cancel Media
- cancel(context, id): this will cancel the ongoing upload if it is not required to be uploaded it will take the context and ID of the file as input
```swift
import com.truvideo.sdk.media.TruvideoSdkMedia

public void cancelUpload(Context context,String id){
   // cancel upload
   TruvideoSdkMedia.cancel(context,id);
}
```
- `cancel(context, id, TruvideoSdkCancelCallback)`: this will cancel the ongoing upload if it is not required to be uploaded it will take the context and ID of the file as input with callback of onError and onReady.
```swift
import com.truvideo.sdk.media.TruvideoSdkMedia
public void cancelUpload(Context context,String id){
   // cancel upload
    TruvideoSdkMedia.cancel(context, id,new TruvideoSdkCancelCallback() {
        @Override
        public void onReady(String s) {
        }

        @Override
        public void onError(String s,TruvideoSdkException e) {  
        }
    });
}
```




