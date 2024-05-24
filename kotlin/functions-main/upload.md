--- 
sidebar_position: 5
---
# Upload
**Description**

The upload function uploads the media on the local storage to the web server, and stores that simultaneously provides the URL to retrieve.

**Syntax**

```kotlin
upload(context,filePath,truvideoSdkUploadCallback)
```
`context` (required) Context :
    The Android application context

`filePath` (required) Uri :
   Uri path of media to upload

`truvideoSdkUploadCallback` (required) Class :
   An instance of a class that implements the TruvideoSdkUploadCallback interface.

**Return value**

None

**Events**

onComplete(),onError(),onProgressChanged() 

**Example**

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