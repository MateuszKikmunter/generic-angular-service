import { Mode } from "./mode.enum";

export class ModalHelper {

/**
  * Sets modal title property. 
  * - Mode add = "Create".
  * - Mode edit = "Edit".
  * - Mode readonly = provided string or "Details" when no title provided.
 */
    public static getModalTitle(modalMode: Mode, readOnlyTitle?: string): string {
        if (modalMode === Mode.readonly) {
            return readOnlyTitle ? readOnlyTitle : "Details";
        }
        else if (modalMode === Mode.add) {
            return "Create";
        } else {
            return "Edit";
        }
    }
}