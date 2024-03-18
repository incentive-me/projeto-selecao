function formatToBRL(value: string | number) {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (!isNaN(numericValue)) {
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "R$ 00,00";
  }
}

function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
}

function convertToFloat(numberString: string) {
  const stringWithoutThousandsSeparator = numberString.replace(/\./g, "");
  const stringWithDotForDecimal = stringWithoutThousandsSeparator.replace(
    /,/g,
    "."
  );

  if (stringWithDotForDecimal === "0" || stringWithDotForDecimal === "") {
    return 0.0;
  }

  const convertedNumber = parseFloat(stringWithDotForDecimal);

  return isNaN(convertedNumber) ? 0.0 : convertedNumber;
}

export { formatToBRL, truncateString, convertToFloat };
