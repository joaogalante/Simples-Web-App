package reports

import (
	ex "fin/lib/excel"
)

var (
	COLS_WIDTH = map[ex.CellRange]float64{
		ex.CellRange{"A", "A"}: 1,
		ex.CellRange{"B", "B"}: 18,
		ex.CellRange{"C", "C"}: 10,
		ex.CellRange{"D", "E"}: 16,
		ex.CellRange{"F", "F"}: 11.5,
		ex.CellRange{"G", "G"}: 4,
		ex.CellRange{"H", "H"}: 4,
		ex.CellRange{"I", "I"}: 5,
		ex.CellRange{"J", "K"}: 11,
		ex.CellRange{"L", "N"}: 10,
	}

	// Index of filler codes
	NUMBER   = "$NUMBER"
	CUSTO    = "$CUSTO"
	PF       = "$PF"
	PJ       = "$PJ"
	REQUEST  = "$REQUEST"
	DELIVERY = "$DELIVERY"

	BASIC_HEADER_VALUES = map[string]interface{}{
		"B2": "Request n.º",
		"C2": NUMBER,
		"D2": "Centro de Custo",
		"E2": CUSTO,
		"F2": "Qtd. de Pesquisas",
		"G2": "PJ",
		"H2": PJ,
		"I2": "Data",
		"J2": "Solicitação",
		"K2": REQUEST,
		"G3": "PF",
		"H3": PF,
		"J3": "Entrega",
		"K3": DELIVERY,
	}
	BASIC_HEADER_MERGES = []ex.CellRange{
		ex.CellRange{"B2", "B3"},
		ex.CellRange{"C2", "C3"},
		ex.CellRange{"D2", "D3"},
		ex.CellRange{"E2", "E3"},
		ex.CellRange{"F2", "F3"},
		ex.CellRange{"I2", "I3"},
		ex.CellRange{"B5", "N5"},
		ex.CellRange{"B10", "N10"},
	}
	BASIC_HEADER_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B1", "N1"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),
		ex.CellRange{"B2", "B2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"B4", "N4"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),
		ex.CellRange{"D2", "D2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),
		ex.CellRange{"F2", "G3"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),
		ex.CellRange{"I2", "J3"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),
		ex.CellRange{"L2", "N3"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),

		ex.CellRange{"C2", "C2"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"E2", "E2"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"H2", "H3"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"K2", "K3"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
		),
	}
	BASIC_HEADER_ROWS_HEIGHT = map[int]float64{
		1: 4,
		4: 4,
	}

	// Index of filler codes
	ENTITY_CODE = "$ENTITY_CODE"
	ENTITY_NAME = "$ENTITY_NAME"

	ENTITY_HEADER_VALUES = map[string]interface{}{
		"B6": "CLIENTES INDICADOS NA SOLICITAÇÃO",
		"B7": "CNPJ / CPF",
		"C7": "Razão Social / Nome",
		"B8": ENTITY_CODE,
		"C8": ENTITY_NAME,
		"B10": "COMPOSIÇÃO DAS PESSOAS JURÍDICAS E RELAÇÃO DE PESSOAS PESQUISADAS	",
	}
	ENTITY_HEADER_MERGES = []ex.CellRange{
		ex.CellRange{"B6", "N6"},
		ex.CellRange{"C7", "N7"},
		ex.CellRange{"C8", "N8"},
		ex.CellRange{"B9", "N9"},
		ex.CellRange{"B10", "N10"},
	}
	ENTITY_HEADER_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B6", "N6"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"B7", "B7"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"C7", "N7"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.DARK_BLUE},
		),
		ex.CellRange{"B8", "B8"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
			ex.Border{Color: ex.DARK_BLUE, Sides: []string{ex.LEFT, ex.BOTTOM}},
		),
		ex.CellRange{"C8", "N8"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Border{Color: ex.DARK_BLUE, Sides: []string{ex.LEFT, ex.BOTTOM, ex.RIGHT}},
		),
		ex.CellRange{"B10", "N10"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, Size: "l", FillColor: ex.DARK_BLUE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.TOP, ex.RIGHT}},
		),
	}

	// Loop
	ENTITIES_ITEM_CODE = "$ENTITIES_ITEM_CODE"
	ENTITIES_ITEM_NAME = "$ENTITIES_ITEM_NAME"
	ENTITIES_ITEM_OBS  = "$ENTITIES_ITEM_OBS"

	ENTITIES_ITEM_VALUES = map[string]interface{}{
		"B2": "Razão Social",
		"L2": "CNPJ:",
		"N2": "OBS:",
		"B3": ENTITIES_ITEM_NAME,
		"L3": ENTITIES_ITEM_CODE,
		"N3": ENTITIES_ITEM_OBS,
	}
	ENTITIES_ITEM_MERGES = []ex.CellRange{
		ex.CellRange{"B1", "N1"},
		ex.CellRange{"B2", "K2"},
		ex.CellRange{"B3", "K3"},
		ex.CellRange{"L2", "M2"},
		ex.CellRange{"L3", "M3"},
	}
	ENTITIES_ITEM_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B1", "N1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT, ex.TOP}},
		),
		ex.CellRange{"B2", "N2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.BLUE},
			ex.Align{H: ex.CENTER},
		),
		ex.CellRange{"B3", "K3"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED, Bold: true},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"L3", "M3"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED, Bold: true},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"N3", "N3"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED, Bold: true},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ENTITIES_ITEM_STYLES_EVEN = map[ex.CellRange]string{
		ex.CellRange{"B2", "N2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.BLUE_2},
			ex.Align{H: ex.CENTER},
		),
	}
	ENTITIES_ITEM_STYLES_WITHOUT_CODE = map[ex.CellRange]string{
		ex.CellRange{"L3", "M3"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ENTITIES_ITEM_STYLES_WITH_OBS = map[ex.CellRange]string{
		ex.CellRange{"N3", "N3"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, Size: "s", FillColor: ex.GREEN},
			ex.Align{H: ex.CENTER, NoWrap: true},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ENTITIES_ITEM_ROWS_HEIGHT = map[int]float64{
		1: 4,
	}

	// Inside loop
	ENTITIES_ITEM_SHAREHOLDERS_HEADER_VALUES = map[string]interface{}{
		"B1": "QUADRO DE SÓCIOS / ACIONISTAS",
		"B2": "CPF / CNPJ",
		"C2": "NOME / RAZÃO SOCIAL",
		"M2": "Participação",
	}
	ENTITIES_ITEM_SHAREHOLDERS_HEADER_MERGES = []ex.CellRange{
		ex.CellRange{"B1", "N1"},
		ex.CellRange{"C2", "L2"},
		ex.CellRange{"M2", "N2"},
	}
	ENTITIES_ITEM_SHAREHOLDERS_HEADER_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B1", "N2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.BLUE},
			ex.Align{H: ex.CENTER},
		),
	}
	ENTITIES_ITEM_SHAREHOLDERS_HEADER_STYLES_EVEN = map[ex.CellRange]string{
		ex.CellRange{"B1", "N2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.BLUE_2},
			ex.Align{H: ex.CENTER},
		),
	}

	// Inside loop | loop
	SHAREHOLDER_CODE       = "$SHAREHOLDER_CODE"
	SHAREHOLDER_NAME       = "$SHAREHOLDER_NAME"
	SHAREHOLDER_PERCENTAGE = "$SHAREHOLDER_PERCENTAGE"

	ENTITIES_ITEM_SHAREHOLDER_VALUES = map[string]interface{}{
		"B1": SHAREHOLDER_CODE,
		"C1": SHAREHOLDER_NAME,
		"M1": SHAREHOLDER_PERCENTAGE,
	}
	ASSOCIATED_ENTITIES_MERGES = []ex.CellRange{
		ex.CellRange{"C1", "L1"},
		ex.CellRange{"M1", "N1"},
	}
	ASSOCIATED_ENTITIES_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "L1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE},
		),
		ex.CellRange{"M1", "N1"}: ex.FormatStyles(
			ex.Format{ex.PERCENTAGE},
			ex.FillAndFont{FillColor: ex.WHITE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ASSOCIATED_ENTITIES_STYLES_HIGHLIGHTED = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "L1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED},
		),
		ex.CellRange{"M1", "N1"}: ex.FormatStyles(
			ex.Format{ex.PERCENTAGE},
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ASSOCIATED_ENTITIES_STYLES_EVEN = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "L1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
		),
		ex.CellRange{"M1", "N1"}: ex.FormatStyles(
			ex.Format{ex.PERCENTAGE},
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ASSOCIATED_ENTITIES_STYLES_EVEN_HIGHLIGHTED = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "L1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE, FontColor: ex.RED},
		),
		ex.CellRange{"M1", "N1"}: ex.FormatStyles(
			ex.Format{ex.PERCENTAGE},
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}

	// Inside loop | Open Start
	ENTITIES_ITEM_ADMINISTRATORS_HEADER_VALUES = map[string]interface{}{
		"B1": "QUADRO DE ADMINISTRADORES",
		"B2": "CPF",
		"C2": "NOME",
		"L2": "Cargo",
	}
	ENTITIES_ITEM_ADMINISTRATORS_HEADER_MERGES = []ex.CellRange{
		ex.CellRange{"B1", "N1"},
		ex.CellRange{"C2", "K2"},
		ex.CellRange{"L2", "N2"},
	}
	ENTITIES_ITEM_ADMINISTRATORS_HEADER_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B1", "N2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.BLUE},
			ex.Align{H: ex.CENTER},
		),
	}
	ENTITIES_ITEM_ADMINISTRATORS_HEADER_STYLES_EVEN = map[ex.CellRange]string{
		ex.CellRange{"B1", "N2"}: ex.FormatStyles(
			ex.FillAndFont{Bold: true, FillColor: ex.BLUE_2},
			ex.Align{H: ex.CENTER},
		),
	}

	// Inside loop | Open Start | loop
	ADMINISTRATOR_CODE      = "$ADMINISTRATOR_CODE"
	ADMINISTRATOR_NAME      = "$ADMINISTRATOR_NAME"
	ADMINISTRATOR_JOB_TITLE = "$ADMINISTRATOR_JOB_TITLE"

	ENTITIES_ITEM_ADMINISTRATOR_VALUES = map[string]interface{}{
		"B1": ADMINISTRATOR_CODE,
		"C1": ADMINISTRATOR_NAME,
		"L1": ADMINISTRATOR_JOB_TITLE,
	}
	ASSOCIATED_ADMINISTRATORS_ENTITIES_MERGES = []ex.CellRange{
		ex.CellRange{"C1", "K1"},
		ex.CellRange{"L1", "N1"},
	}
	ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "K1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE},
		),
		ex.CellRange{"L1", "N1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES_HIGHLIGHTED = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "K1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED},
		),
		ex.CellRange{"L1", "N1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.WHITE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES_EVEN = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "K1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
		),
		ex.CellRange{"L1", "N1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
	ASSOCIATED_ADMINISTRATORS_ENTITIES_STYLES_EVEN_HIGHLIGHTED = map[ex.CellRange]string{
		ex.CellRange{"B1", "B1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
		ex.CellRange{"C1", "K1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE, FontColor: ex.RED},
		),
		ex.CellRange{"L1", "N1"}: ex.FormatStyles(
			ex.FillAndFont{FillColor: ex.LIGHT_BLUE, FontColor: ex.RED},
			ex.Align{H: ex.CENTER},
			ex.Border{Sides: []string{ex.LEFT, ex.RIGHT}},
		),
	}
)
