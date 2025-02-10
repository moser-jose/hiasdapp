import { SvgProps } from "react-native-svg";

export interface HymnsTypes extends SvgProps {
  title: string;
  ingles?: string;
  numero?: number;
  numero_view?: string;
  texto_biblico?:string
  categoria:{
    id:number;
    idsubcategoria:number
  },
  coro?:[
	{
		"nome_coro": string,
		"coro": string
	}
  ]
  autores:[{
    nome:string
  }],
  estrofes:[{
    numero:string;
    estrofe:string;
  }]
}

			"title": "Santo, Santo, Santo",
			"ingles": null,
			"numero": 1,
			"numero_view": "001",
			"categoria": {
				"id": 1,
				"idsubcategoria": 1
			},
			"autores": [
				{
					"nome": "John B. Dykes"
				},
				{
					"nome": "Reginald Heber"
				}
			],
			"estrofes": [
				{
					"numero": "v1",
					"estrofe": "Santo, santo, santo! Deus onipotente!\nCedo de manhã, cantaremos Teu louvor\nSanto, santo, santo! Deus Jeová triúno!\nÉs Deus excelso, nosso Criador"
				},
				{
					"numero": "v2",
					"estrofe": "Santo, santo, santo! Nós, os pecadores\nNão podemos ver Tua glória sem tremor\nTu somente és santo, justo e compassivo\nPuro e perfeito, nosso Redentor"
				},
				{
					"numero": "v3",
					"estrofe": "Santo, santo, santo! Deus onipotente!\nTua criação manifesta o Teu amor\nAntes de criares todo o Céu e a Terra\nEras e sempre hás de ser, Senhor"
				}
			] */