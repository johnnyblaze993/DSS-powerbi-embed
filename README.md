# GPT summary of Inter process communication (ICP)

Electron IPC Communication in Your App
Overview
In Electron, the main process and renderer processes run in separate contexts. The main process is responsible for managing application lifecycle events, window creation, and native functionality, while the renderer processes are responsible for rendering the UI, typically using HTML, CSS, and JavaScript (or a framework like React).

To communicate between the main process and renderer processes (or between multiple renderer processes), Electron provides IPC (Inter-Process Communication) channels. IPC in Electron is accomplished with ipcMain in the main process and ipcRenderer in the renderer process.

Your application uses IPC to:

Send data from the main React app to a secondary test window.
Relay information from the test window back to the main app.
Key Components

1. Main Process (electron.ts)
   Manages window creation and application lifecycle.
   Listens for IPC events to create secondary windows and send coordinates from test windows to the main window.
2. Renderer Processes (App.tsx and AddCoordinate.tsx)
   App.tsx (Main app) receives coordinates from AddCoordinate.tsx or test windows and displays them in the Cesium viewer.
   AddCoordinate.tsx sends coordinates to the main process to relay them to the main app.
3. Preload Script (preload.ts)
   Acts as a bridge between the renderer processes and the main process by exposing custom APIs using contextBridge.
   IPC Flow in Your Application
   Sending Coordinates from AddCoordinate.tsx to App.tsx
   The flow to send and receive coordinates between AddCoordinate.tsx and App.tsx involves:

Triggering an IPC event from AddCoordinate.tsx to the main process.
Relaying the coordinates from the main process to App.tsx.
Here's a breakdown of each part:

A. Sending Coordinates from AddCoordinate.tsx
In AddCoordinate.tsx, when a coordinate is added, an IPC event is emitted to the main process.

Example Code in AddCoordinate.tsx:

// Import the Electron API exposed in the preload script
import React, { useState } from 'react';

const handleSubmit = () => {
const coordinate = { longitude: '...', latitude: '...' };

    // Send the coordinate to the main process
    window.electronAPI.sendCoordinates(coordinate);

};
Here, sendCoordinates is an API exposed by preload.ts to send the coordinate object to the main process.

B. Receiving Coordinates in the Main Process
The main process (electron.ts) listens for the send-coordinates event, which is emitted by AddCoordinate.tsx. It then forwards this coordinate data to the main app.

Example Code in electron.ts:

ipcMain.on('send-coordinates', (\_event, coordinate) => {
if (mainWindow) {
mainWindow.webContents.send('update-coordinates', coordinate); // Send to App.tsx
}
});
Here’s what happens:

ipcMain.on('send-coordinates') listens for the send-coordinates event.
mainWindow.webContents.send('update-coordinates', coordinate) sends the coordinate to the main window where App.tsx is displayed.
C. Listening in App.tsx
In App.tsx, we listen for the update-coordinates event from the main process. When a new coordinate is received, it’s added to the store and rendered on the Cesium viewer.

Example Code in App.tsx:

import { useEffect } from 'react';

useEffect(() => {
window.electronAPI.onCoordinatesUpdate((newCoordinate) => {
addCoordinate(newCoordinate); // Add to the state/store
});
}, []);
Here’s what happens:

window.electronAPI.onCoordinatesUpdate listens for update-coordinates events.
addCoordinate(newCoordinate) updates the coordinate list in the store, which in turn triggers an update in the UI (Cesium viewer).
Preload Script (preload.ts)
The preload.ts script creates a bridge between the renderer processes and the main process.

Example Code in preload.ts:

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
sendCoordinates: (coordinates) => ipcRenderer.send('send-coordinates', coordinates),
onCoordinatesUpdate: (callback) => ipcRenderer.on('update-coordinates', (\_event, data) => callback(data)),
});
Here’s what each method does:

sendCoordinates: Emits the send-coordinates event to the main process when a coordinate is added.
onCoordinatesUpdate: Registers a listener in App.tsx to receive update-coordinates events from the main process.
Example: Sending Events to Open Windows
In electron.ts, we also handle the creation of new windows using IPC. Here’s how it works:

ipcMain.on('open-test-window', () => {
createTestWindow(); // Opens a new test window when requested
});
The renderer process can request a new test window to be opened by calling:

window.electronAPI.openTestWindow();
This setup allows you to control window management and data flow between windows effectively.

Summary and Extensions
Add Data Flow:

AddCoordinate.tsx → electron.ts → App.tsx
Window Control:

The main process controls when new windows open or close and forwards data as needed.
Future Extensions:

Add more IPC channels as needed, e.g., for deleting or editing coordinates.
Use the same flow to add other types of data or actions (e.g., settings, user preferences).
