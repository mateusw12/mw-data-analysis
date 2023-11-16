import { Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import {
  AiOutlineEdit,
  AiOutlineEyeInvisible,
  AiOutlineFieldNumber,
  AiOutlineFilter,
  AiOutlineImport,
} from "react-icons/ai";
import {
  BsArrowDown,
  BsArrowDownUp,
  BsArrowUp,
  BsCalculator,
  BsCalendar4Range,
  BsTable,
} from "react-icons/bs";
import { GiProgression } from "react-icons/gi";
import {
  MdOutlineClear,
  MdOutlineSettings
} from "react-icons/md";

const ContextMenu = (props: { children; selectMenuItem? }) => {
  const { children, selectMenuItem } = props;

  const items: ItemType[] = [
    {
      label: "Colunas",
      key: "column",
      icon: <BsTable style={{ transform: "scale(1.5)" }} />,
      children: [
        {
          label: "Editar",
          key: "editColumn",
          icon: <AiOutlineEdit style={{ transform: "scale(1.5)" }} />,
          disabled: true,
        },
        {
          label: "Esconder",
          key: "hideColumn",
          icon: <AiOutlineEyeInvisible style={{ transform: "scale(1.5)" }} />,
        },
        {
          label: "Configurar",
          key: "settingColumn",
          icon: <MdOutlineSettings style={{ transform: "scale(1.5)" }} />,
          disabled: true,
        },
      ],
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
          label: "Verde",
          key: "highlightRelevanceGreen",
        },
        {
          label: "Azul",
          key: "highlightRelevanceBlue",
        },
        {
          label: "Laranja",
          key: "highlightRelevanceOrange",
        },
        {
          label: "Vermelho",
          key: "highlightRelevanceRed",
        },
        {
          label: "Laranja até Verde",
          key: "highlightRelevanceGreenOrange",
        },
        {
          label: "Vermelho até Verde",
          key: "highlightRelevanceRedGreen",
        },
        {
          label: "Vermelho até Azul",
          key: "highlightRelevanceRedBlue",
        },
      ],
    },
    {
      label: "Filtros",
      key: "filter",
      icon: <AiOutlineFilter style={{ transform: "scale(1.5)" }} />,
      disabled: true,
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
