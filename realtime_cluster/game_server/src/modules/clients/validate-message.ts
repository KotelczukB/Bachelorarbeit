import IClientInput from "../../models/Interfaces/clients-inputs/IClientInput";

// falls im Root noch einfache Objekte vorhanden sind

export default (inputObj: IClientInput, root: string[], requirements: {[idx: string]: string[]}): boolean => 
  filterValidation(Object.keys(requirements).map(key => validateFlatObjectInput(requirements[key], inputObj[key]))) && validateFlatObjectInput(root, inputObj);

export const validateFlatObjectInput = (requiered: string[], input: {[idx: string]: any}): boolean => filterValidation(Object.keys(input).map(checkAgainsProps(requiered, input))) 

export const checkAgainsProps = (requiered: string[], inputObj: {[idx: string]: any}) => (input: string): boolean => requiered.find(elem => elem === input) !== undefined && checkOnValue(inputObj, input)

export const checkOnValue = (inputObj: {[idx:string] : any}, key: string) => inputObj[key] !== undefined

export const filterValidation = (arr: boolean[]): boolean => arr.find(elem => elem === false) === undefined