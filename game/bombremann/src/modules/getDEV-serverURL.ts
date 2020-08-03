import { getDEBUG } from './get-envs';

export default (path: string): string => {
	if (getDEBUG() === 'DEV') {
		const splitted = path.split(':');
		return `${splitted[0]}://localhost:${splitted[2]}`;
	}
	return path;
};
