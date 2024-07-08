# Journal App - React Native with Expo

This is a React Native application built with Expo for managing journal entries.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).
- **Expo CLI**: Install Expo CLI globally using npm:
  ```bash
  npm install -g expo-cli
  ```
- **Yarn**: Install Yarn package manager if you don't have it already:
  ```bash
  npm install -g yarn
  ```

## Setup

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/morachake/Journal_app.git
cd Journal_app
```

### Install Dependencies

Install the required dependencies using `npm` or `yarn`:

```bash
npm install
# or
yarn install
```

### Running the Application

Start the Expo development server:

```bash
expo start
```

This will start the Expo CLI and provide you with a QR code. You can scan this QR code with the Expo Go app on your mobile device to run the application.

### Running on a Physical Device

1. **Expo Go App**:
   - Download the Expo Go app from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US).
   - Open the Expo Go app on your device.
   - Scan the QR code displayed in the terminal after running `expo start`.

### Running on an Emulator

1. **iOS Simulator**:
   - Ensure you have Xcode installed.
   - Open the iOS simulator from Xcode.
   - Press `i` in the terminal to open your app in the iOS simulator.

2. **Android Emulator**:
   - Ensure you have Android Studio installed with an Android emulator configured.
   - Start the Android emulator.
   - Press `a` in the terminal to open your app in the Android emulator.

### Folder Structure

```
JOURNAL_APP/
├── .expo/
├── .vscode/
├── assets/
├── assets 2/
├── node_modules/
├── node_modules 2/
├── src/
├── .gitignore
├── app.json
├── App.tsx
├── babel.config.js
├── eas.json
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```


### Useful Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)

By following these steps, you should be able to set up and run the Journal App successfully. If you encounter any issues, please refer to the Expo and React Native documentation or seek help from the community.