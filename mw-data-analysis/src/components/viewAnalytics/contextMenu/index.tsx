import { Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import {
  AiOutlineEyeInvisible,
  AiOutlineFieldNumber,
  AiOutlineImport,
} from "react-icons/ai";
import {
  BsArrowDown,
  BsArrowDownUp,
  BsArrowUp,
  BsCalculator,
  BsCalendar4Range,
} from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import { MdOutlineClear, MdOutlineSettings } from "react-icons/md";

const ContextMenu = (props: { children; selectMenuItem? }) => {
  const { children, selectMenuItem } = props;

  const createGradientStyle = (startColor: string, endColor: string) => ({
    width: "60px",
    height: "25px",
    backgroundImage: `linear-gradient(to right, ${startColor}, ${endColor})`,
  });

  const blueGradient = createGradientStyle("#409fbf", "#FFFFFF");
  const greenGradient = createGradientStyle("rgb(112, 207, 160)", "#FFFFFF");
  const redGradient = createGradientStyle("#fa664c", "#FFFFFF");
  const orangeGradient = createGradientStyle("#ffbf00", "#FFFFFF");
  const orangeToGreenGradient = createGradientStyle("#ffbf00", "#40bf80");
  const redToGreenGradient = createGradientStyle("#fa664c", "#40bf80");
  const redToBlueGradient = createGradientStyle("#fa664c", "#409fbf");

  const items: ItemType[] = [
    {
      label: "Esconder Colunas",
      key: "hideColumn",
      icon: <AiOutlineEyeInvisible style={{ transform: "scale(1.5)" }} />,
    },
    {
      label: "Colorir Faixa de Atingimento",
      key: "colorAchievement",
      icon: <BsCalendar4Range style={{ transform: "scale(1.5)" }} />,
    },
    {
      label: "Colorir Evolução",
      key: "colorEvolution",
      icon: <GiProgression style={{ transform: "scale(1.5)" }} />,
    },
    {
      label: "Destacar por valor",
      key: "highlightValue",
      icon: <AiOutlineFieldNumber style={{ transform: "scale(1.5)" }} />,
      children: [
        {
          label: "Positivos e Negativos",
          key: "positiveAndNegative",
          icon: <BsArrowDownUp style={{ transform: "scale(1.5)" }} />,
        },
        {
          label: "Somente Negavitos",
          key: "negative",
          icon: <BsArrowDown style={{ transform: "scale(1.5)" }} />,
        },
        {
          label: "Somente Positivos",
          key: "positive",
          icon: <BsArrowUp style={{ transform: "scale(1.5)" }} />,
        },
        {
          label: "Customizado",
          key: "customColor",
          icon: <MdOutlineSettings style={{ transform: "scale(1.5)" }} />,
        },
      ],
    },
    {
      label: "Destacar por relevância",
      key: "highlightRelevance",
      icon: <AiOutlineImport style={{ transform: "scale(1.5)" }} />,
      children: [
        {
          label: <div style={greenGradient} />,
          key: "highlightRelevanceGreen",
        },
        {
          label: <div style={blueGradient} />,
          key: "highlightRelevanceBlue",
        },
        {
          label: <div style={orangeGradient} />,
          key: "highlightRelevanceOrange",
        },
        {
          label: <div style={redGradient} />,
          key: "highlightRelevanceRed",
        },
        {
          label: <div style={orangeToGreenGradient} />,
          key: "highlightRelevanceGreenOrange",
        },
        {
          label: <div style={redToGreenGradient} />,
          key: "highlightRelevanceRedGreen",
        },
        {
          label: <div style={redToBlueGradient} />,
          key: "highlightRelevanceRedBlue",
        },
      ],
    },
    {
      label: "Fórmula",
      key: "formula",
      icon: <BsCalculator style={{ transform: "scale(1.5)" }} />,
      disabled: true,
    },
    {
      label: "Limpar Efeitos",
      key: "clearEffect",
      icon: <MdOutlineClear style={{ transform: "scale(1.5)" }} />,
    },
    {
      label: "Limpar Fórmula",
      key: "clearFormula",
      icon: <MdOutlineClear style={{ transform: "scale(1.5)" }} />,
      disabled: true,
    },
  ];

  const handleOnClick: MenuProps["onClick"] = ({ key }) => {
    selectMenuItem(key);
  };

  return (
    <>
      <Dropdown
        menu={{ items, onClick: handleOnClick }}
        trigger={["contextMenu"]}
      >
        {children}
      </Dropdown>
    </>
  );
};

export default ContextMenu;
