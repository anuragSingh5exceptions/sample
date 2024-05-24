---
sidebar_position: 3
---
# Media
Our Media module stands out as a potent tool for efficient and secure management and sharing of your image and video content. This module streamlines the process of uploading multimedia files to cloud storage, offering a hassle-free experience.

**Primary Benefit**
- Seamlessly integrates with your workflow through its user-friendly API, reducing the need for manual database management.
- Eliminates the complexities of setting up databases and managing servers, allowing you to focus on your core tasks

### Adding Module
Add a dependency for the core module in Swift Package Manager.
```md
https://github.com/Truvideo/truvideo-sdk-ios-media.git
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

### Upload Media
The uploadFile function facilitates the uploading of photos or videos by accepting the context and the URI of the local file path as parameters. 
```swift
import Combine
import TruvideoSdkMedia

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
### Transcription
Our transcriptions module simplifies video transcription. Upload videos effortlessly, initiate transcription, and retrieve results seamlessly, it's ideal for content management, media monitoring, and educational platforms. 
```swift
import TruvideoSdkMedia

func uploadFile(videoPath: String) {
    let fileUploadRequest = TruvideoSdkMedia.uploader.uploadFile(
        at: url,
        tags: [
            "color": "red",
            "order-number": "123",
            "key1": "value1"
        ],
        metadata: [
            "key": "value",
            "numeric": 1,
            "nested": [
                "key1": "value1",
                "key2": "value2"
            ]
        ]
    )
                       
    let progressCancellable = fileUploadRequest.progressHandler.sink(receiveValue: { fileUpload in
        let percentage = fileUpload.percentage
        // Handle upload progress
    })
    
    let completeCancellable = fileUploadRequest.completionHandler.sink(receiveCompletion: { receiveCompletion in
        switch receiveCompletion {
        case .finished:
          // Handle completion
        case .failure(let error):
          // Handle error
        }
    }, receiveValue: { uploadedResult in
        // Handle upload completed
        let url = uploadedResult.uploadedFileURL
        let transcriptionUrl = uploadedResult.transcriptionURL
        let tags = uploadedResult.tags
        let metadata = uploadedResult.metadata
    })    
}
```
### Cancel Media
The cancelUpload function, implemented within the `TruvideoSdkMedia` module, allows for the cancellation of a file upload request specified by the `TruvideoSdkMediaFileUploadRequest` parameter.
```swift
import TruvideoSdkMedia

func cancelUpload(request: TruvideoSdkMediaFileUploadRequest){
    TruvideoSdkMedia.uploader.cancel(request: request)
}
```





