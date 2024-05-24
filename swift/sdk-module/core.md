---
sidebar_position: 1
---
# Core
A robust user authentication system is implemented to ensure our platform's security and privacy. User credentials are securely stored and encrypted using industry-standard methods. Access control is enforced through carefully managed permissions, granting users access only to features and functionalities based on the entitlements. This approach adheres to stringent security and data protection standards. Personalized services are provided by leveraging stored credentials, allowing for tailored user experiences. It is important to note that authentication is mandatory for utilizing any functionality within the TruvideoSDK. 
 
:::note Note

Please note that authentication is a prerequisite for utilizing any functionality within the TruvideoSDK.

:::

### Adding Module
Add a dependency for the core module in Swift Package Manager.
```md
https://github.com/Truvideo/truvideo-sdk-ios-core.git 
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

### Authentication Status
The Truvideo SDK provides two properties that serve to check the authentication status: 
- isAuthenticated : Returns true or false indicating whether the client is authenticated. Please note that authentication may be expired.
- isAuthenticationExpired : Return true or false indicating whether the authentication is expired. If the client is not authenticated, it always returns false.
```swift
let isAuthenticated = TruvideoSdk.isAuthenticated
let isAuthenticationExpired = TruvideoSdk.isAuthenticationExpired
```
How to authenticate 
The authenticate method requires the following inputs:
1. ApiKey: A string provided by Truvideo upon registration.
2. Payload: Essential data containing device information, generated internally using the generatePayload() function.
3. Signature: Encrypt the payload with the provided secret key using the SHA256 algorithm to regenerate the signature.

Upon completion, it triggers the onReady callback or the onError callback in case of an error.

:::note
The API key and Secret key are provided by the TRUVideo SDK team.
:::

### Algorithm for encoding the signature:
To encode the payload, utilize the following function for conversion: The string undergoes conversion using the SHA256 algorithm, incorporating the provided secret key.
```swift
import Foundation
import CommonCrypto
extension String {
    /// Calculates the HMAC-SHA256 value for a given message using a key.
    ///
    /// - Parameters:
    ///    - msg: The message for which the HMAC will be calculated.
    ///    - key: The secret key used to calculate the HMAC.
    /// - Returns: The calculated HMAC-SHA256 value in hexadecimal format.
    func toSha256String(using key: String) -> String {
        let hmac256 = CCHmacAlgorithm(kCCHmacAlgSHA256)
        var macData = Data(count: Int(CC_SHA256_DIGEST_LENGTH))
        
        key.withCString { keyCString in
            withCString { msgCString in
                macData.withUnsafeMutableBytes { macDataBytes in
                    guard let keyBytes = UnsafeRawPointer(keyCString)?.assumingMemoryBound(to: UInt8.self),
                          let msgBytes = UnsafeRawPointer(msgCString)?.assumingMemoryBound(to: UInt8.self) else {
                        return
                    }
                    
                    CCHmac(
                        hmac256,
                        keyBytes, Int(strlen(keyCString)),
                        msgBytes, Int(strlen(msgCString)),
                        macDataBytes.bindMemory(to: UInt8.self).baseAddress
                    )
                }
            }
        }
        
        return macData.map { String(format: "%02x", $0) }
            .joined()
    }
}
```
The syntax for utilizing this encoding process appears as follows:
```swift
payload.toSha256String(using: Constant.secretKey)
```

:::note
We suggest avoiding storing the secret within the host application. Instead, set up a private backend owned by you. This backend will handle the payload from the Truvideo SDK and generate the signature. By doing this, you can prevent the secret from being exposed, reducing the risk of security issues
:::

```swift
import TruvideoSdk
class CoreModule: NSObject{
    
    /// Authentication process
    func authenticate(){
        /// Verify if the user is already authenticated or if the session is active or expired..
        if(!TruvideoSdk.isAuthenticated || TruvideoSdk.isAuthenticationExpired){
            
            let payload = TruvideoSdk.generatePayload()
            /// The payload string is transformed into an encrypted string using the SHA256 algorithm.
            let signature = payload.toSha256String(using: Constant.secretKey)
            
            Task(operation: {
                do{
                    ///   Initialize a session when the user is not authenticated.
                    /// - Parameters:
                    ///     - API_Key : Provided by TruVideo team
                    ///     - Payload : generated by sdk TruvideoSdk.generatePayload() every time you have to create new payload
                    ///     - Signature: encrypted string payload using the SHA256 algorithm with "secret key"
                    ///     - Secret_Key: secret key is also provided by TruVideo team
                    try await TruvideoSdk.authenticate(apiKey: Constant.apiKey, payload: payload, signature: signature)
                }catch {
                }
            })
        }else{
            Task(operation: {
                do{
                    /// Initialize a session when the user is already authenticated.
                    try await TruvideoSdk.´init´()
                }catch {
                }
            })
        }
    }
}
```
### Clear Authentication
To delete the current session and erase all associated authentication data, utilize the clear method 

```swift
TruvideoSdk.clear()
```
