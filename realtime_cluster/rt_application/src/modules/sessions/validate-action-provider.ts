export default (provider: string | undefined): boolean => provider === undefined || provider === 'server';