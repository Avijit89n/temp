import { Button } from '@/components/ui/button'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const provisionDevice = async () => {
  try {
    setStatus("Scanning for devices...");

    const device = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: "WaterFilter" }],
      optionalServices: ["12345678-1234-5678-1234-56789abcdef0"],
    });

    setStatus("Connecting to device...");
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(
      "12345678-1234-5678-1234-56789abcdef0"
    );
    const characteristic = await service.getCharacteristic(
      "abcdef01-1234-5678-1234-56789abcdef0"
    );
    const encoder = new TextEncoder();
    const wifiData = {
      ssid, password, macAddr: "C8:F0:9E:9F:5D:94"
    };
    await characteristic.writeValue(encoder.encode(JSON.stringify(wifiData)));

    setStatus("WiFi credentials sent! Device will restart...");
  } catch (error) {
    setStatus("Error: " + error.message);
  }
}

function Device() {
  return (
    <div className="p-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Add Device
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-sm w-full p-5 bg-white rounded border border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Add New Device
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm">
              Connect your device to WiFi to start using it.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WiFi SSID
              </label>
              <input
                type="text"
                placeholder="Enter WiFi SSID"
                className="w-full border text-sm border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WiFi Password
              </label>
              <input
                type="password"
                placeholder="Enter WiFi Password"
                className="w-full border text-sm border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-2 rounded-md">
              Scan & Send to Device
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Device
