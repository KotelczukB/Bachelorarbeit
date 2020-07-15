

import { IClientInput } from "../models/IPlayerInput";
import * as R from "ramda"

//****************************** */
// einfacher check ob die position stimmen kann und ausgabe von ubrigen elementen
//****************************** */

export default (
  grupped: { [idx: string]: (IClientInput | null)[] },
  new_input: (IClientInput | null)[]
): (IClientInput | null)[] => {
  new_input.forEach((input) => {
    if (input && grupped[input.token] !== undefined)
      grupped[input.token] = validateInput(grupped[input.token], input);
  });
  // sort absteigend (neuste am anfang) und nimm die ersten id ist ja timestamp :D
  return R.flatten(Object.values(grupped).map((arr) => arr.sort((a,b)=> a && b ? b.id-a.id : 0)))
};

export const validateInput = (old: (IClientInput | null)[], new_input: IClientInput ): (IClientInput | null)[]  => {
  const last_item = old.shift()
  if(!last_item)
    return [];
    // wenn alles in den zu erwarteten unterschieden dann gebe neue daten zuruck
  if(validateHeck(last_item, new_input))
    return [new_input];
    // wenn die daten zu sehr abweichen somit wird der letzte schritt des Hackers >D zuruck gesetzt
  return old;
}

export const validateHeck = (old: IClientInput, ne: IClientInput): boolean => 
   Math.abs(old.app.player_data.pos_x - ne.app.player_data.pos_x) < 20 &&
  Math.abs(old.app.player_data.pos_y - ne.app.player_data.pos_y) < 20 &&
  Math.abs(old.app.bullets_data.pos_x - ne.app.bullets_data.pos_x) < 20 &&
  Math.abs(old.app.bullets_data.pos_y - ne.app.bullets_data.pos_y) < 20
