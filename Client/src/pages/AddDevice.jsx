import React, { useState } from "react";

function AddDevice() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

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

  return (
    <></>
  );
}

export default AddDevice;
