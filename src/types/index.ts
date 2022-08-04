import defaultSettings from "@/config/defaultSettings";
import { Settings } from "@ant-design/pro-layout";

/** user's device */
enum DeviceList {
  /** telephone */
  MOBILE = 'MOBILE',
  /** computer */
  DESKTOP = 'DESKTOP'
}

export type Device = keyof typeof DeviceList;


