import ISessionCreate from "../../models/Interfaces/session/ISessionCreate";
import R from "ramda";

export default (session_create: ISessionCreate): boolean => validProps(R.map(valueThere, R.values(session_create)))

export const validProps = (values: boolean[]):boolean => values.filter(elem => elem === false).length < 1

export const valueThere = (value: string | number): boolean => value !== undefined && value !== null