export const getDollars = (amountInCents: number): string | null => {
	if (!amountInCents) {
		return null;
	}

	return `$${(amountInCents / 100).toFixed(2)}`;
};
