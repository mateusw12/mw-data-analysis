import chroma from "chroma-js";

export const getColorScale = (value, min, max, colors: string[]) => {
  if (typeof value === "number") {
    if (colors.length >= 2) {
      return getColorScaleFromTo(value, min, max, colors[0], colors[1]);
    }

    const base = max - min;
    value += base <= max ? -min : max;
    const percent = base !== 0 ? (1 - value / base) * 0.75 : 0;
    const baseColor = chroma.valid(colors[0])
      ? chroma(colors[0])
      : chroma("#FFFFFF");
    const hsl = baseColor.hsl();

    let lightness = hsl[2];
    lightness = lightness * percent + lightness;

    return baseColor.set("hsl.l", lightness).hex();
  }
  return "#FFFFFF";
};

const getColorScaleFromTo = (
  value: number,
  min: number,
  max: number,
  colorFrom: string,
  colorTo: string
) => {
  const base = max - min;
  value += base <= max ? -min : max;
  const percent = base !== 0 ? value / base : 0;

  const fromColor = chroma.valid(colorFrom)
    ? chroma(colorFrom).hsl()
    : chroma("#FFFFFF").hsl();
  const toColor = chroma.valid(colorTo)
    ? chroma(colorTo).hsl()
    : chroma("#FFFFFF").hsl();

  const fromHue = fromColor[0];
  const toHue = toColor[0];
  const hue = percent * (toHue - fromHue) + fromHue;

  return chroma.hsl(hue, 1, 0.6).hex();
};

export const getEvolutionColor = (cellValue, rowValues: unknown[]) => {
  const colors = ["#FF7575", "#FFFFA5", "#A5FFA5"];

  for (let i = 0; i < rowValues.length; i++) {
    const currentValue = rowValues[i];
    const nextValue = i < rowValues.length - 1 ? rowValues[i + 1] : null;

    if (typeof currentValue === "number") {
      if (nextValue !== null) {
        if (cellValue < nextValue) {
          return colors[0]; // vermelho
        } else if (cellValue > nextValue) {
          return colors[2]; // verde
        } else {
          return colors[1]; // amarelo
        }
      } else if (i > 0) {
        // Se for a última célula e houver uma célula anterior, compara com a anterior
        const previousValue = rowValues[i - 1];
        if (cellValue < previousValue) {
          return colors[0]; // vermelho
        } else if (cellValue > previousValue) {
          return colors[2]; // verde
        } else {
          return colors[1]; // amarelo
        }
      }
    }
  }
  return "";
};

export const getRelevanceColor: { [key: string]: string[] } = {
  highlightRelevanceGreen: ["#40bf80"],
  highlightRelevanceBlue: ["#409fbf"],
  highlightRelevanceOrange: ["#ffbf00"],
  highlightRelevanceRed: ["#fa664c"],
  highlightRelevanceGreenOrange: ["#ffbf00", "#40bf80"],
  highlightRelevanceRedGreen: ["#fa664c", "#40bf80"],
  highlightRelevanceRedBlue: ["#fa664c", "409fbf"],
};
