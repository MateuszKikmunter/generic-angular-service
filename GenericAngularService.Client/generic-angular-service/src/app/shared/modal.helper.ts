import { Mode } from "../core/enums/mode.enum";

export class ModalHelper {

/**
  * Sets modal title property. 
  * - Mode add = "Create".
  * - Mode edit = "Edit".
  * - Mode readonly = provided string or "Details" when no title provided.
 */
    public static getModalTitle(modalMode: Mode, readOnlyTitle?: string): string {
        if (modalMode === Mode.READONLY) {
            return readOnlyTitle ? readOnlyTitle : "Details";
        }
        else if (modalMode === Mode.ADD) {
            return "Create";
        } else {
            return "Edit";
        }
    }
}