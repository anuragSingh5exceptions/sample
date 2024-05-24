--- 
sidebar_position: 5
---
# Upload
**Description**

The upload function uploads the media on the local storage to the web server, and stores that simultaneously provides the URL to retrieve.

**Syntax**

```swift
TruvideoSdkMedia.uploader.uploadFile(
        at: URL(string: videoPath)!
    )
```
`filePath` (required) Url
   Url path of media to upload

**Return value**

None

**Example**

```swift
func uploadFile(videoPath: String, viewController: UIViewController) {
    // Media Uploading
    // Create a file upload request using TruvideoSdkMedia uploader
    let fileUploadRequest = TruvideoSdkMedia.uploader.uploadFile(
        at: URL(string: videoPath)!
    )
    
    // Print the file upload request for debugging
    print("fileUploadRequest: ", fileUploadRequest)
    
    // Completion of request
    // Handle the completion of the file upload request
    let completeCancellable = fileUploadRequest.completionHandler
        .receive(on: DispatchQueue.main)
        .sink(receiveCompletion: { receiveCompletion in
            // Handle different completion cases
            switch receiveCompletion {
            case .finished:
                print("finished")
            case .failure(let error):
                // Print any errors that occur during the upload process
                print("failure:", error)
            }
        }, receiveValue: { uploadedResult in
            // Upon successful upload, retrieve the uploaded file URL
            let url = uploadedResult.uploadedFileURL
            print("uploadedResult: ", uploadedResult)
        })
    
    // Store the completion handler in the dispose bag to avoid premature deallocation
    completeCancellable.store(in: &disposeBag)
    // Progress of request
    // Track the progress of the file upload request
    let progress = fileUploadRequest.progressHandler
        .receive(on: DispatchQueue.main)
        .sink(receiveValue: { progress in
            // Handle progress updates if needed
        })
    // Store the progress handler in the dispose bag to avoid premature deallocation
    progress.store(in: &disposeBag)
}

```