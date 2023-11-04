export const formatNumber = (number: number) => {
  const numberString = String(number);

  if (numberString.includes("e")) {
    const [base, exponent] = numberString.split("e");
    const formattedBase = parseFloat(base).toFixed(2);
    const formattedExponent = parseInt(exponent);
    return `${formattedBase}e${formattedExponent}`;
  }

  const decimalPlaces = numberString.split(".")[1]?.length || 0;

  if (decimalPlaces > 4) {
    if (Number(number.toFixed(4)) > 0) return number.toFixed(4);

    const formattedNumber = Number(number).toExponential(5);
    const [, exponent] = formattedNumber.split("e");

    const minExpoent: string[] = ["-2", "-1", "0", "+0", "+1", "+2"];

    if (minExpoent.includes(exponent)) {
      return number.toFixed(4);
    }
    return formattedNumber;
  }

  return numberString;
};
