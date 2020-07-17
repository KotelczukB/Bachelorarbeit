import { getRT_CONSTRAIN } from "../helpers/get-envs";

//**************************************** */
// validierung der Echtzeitbedingung
//**************************************** */

export default (msg_timestamp: number, now_timestamp: number): boolean => now_timestamp - msg_timestamp <= getRT_CONSTRAIN() 