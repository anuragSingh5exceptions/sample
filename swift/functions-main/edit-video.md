--- 
sidebar_position: 4
---
# Edit Video
**Description**

The `openEditScreen` open video in editing screen after that on editing complete it return the status of onReady

**Syntax**
```swift
presentTruvideoSdkVideoEditorView(preset: preset) { trimmerResult in
            // Print a success message along with the trimmer result
            print("Successfully edited", trimmerResult)
        }
```
`preset` (required) 
TruvideoSdkVideoEditorPreset is a struct comprising two parameters: videoURL and outputURL.
```swift
let preset = TruvideoSdkVideoEditorPreset(
            videoURL: video,
            outputURL: output
        )
```

**Return value**

None

**Events**

onReady()

**Example**
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

