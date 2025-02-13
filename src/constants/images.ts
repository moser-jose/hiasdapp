import { Image } from 'react-native';

import logo from '@/assets/app/logo.png';

import adoracao from '@/assets/app/categories/antigo/adoracao.jpg';
import amen from '@/assets/app/categories/antigo/amen.jpg';
import canticosResponsivos from '@/assets/app/categories/antigo/canticos-responsivos.jpg';
import deusOPai from '@/assets/app/categories/antigo/deus-o-pai.jpg';
import espiritoSanto from '@/assets/app/categories/antigo/espirito-santo.jpg'
import igrejaDoutrina from '@/assets/app/categories/antigo/igreja-doutrina.jpg';
import jesusCristo from '@/assets/app/categories/antigo/jesus-cristo.jpg'
import larCristao from '@/assets/app/categories/antigo/lar-cristao.jpg';
import vidaCrista from '@/assets/app/categories/antigo/vida-crista.jpg';
import OEvangelho from '@/assets/app/categories/antigo/o-evangelho.jpg';
import SantaEscritura from '@/assets/app/categories/antigo/santa-escritura-1.jpg';

import categoryGod from '@/assets/app/categories/categoryGod.jpg';
import sonGod from '@/assets/app/categories/sonGod.jpg';

export const logoApp = Image.resolveAssetSource(logo).uri

// Antigo
const adoracaoImage = Image.resolveAssetSource(adoracao).uri
const AmenImage = Image.resolveAssetSource(amen).uri
const canticosResponsivosImage = Image.resolveAssetSource(canticosResponsivos).uri
const deusOPaiImage = Image.resolveAssetSource(deusOPai).uri
const espiritoSantoImage = Image.resolveAssetSource(espiritoSanto).uri
const igrejaDoutrinaImage = Image.resolveAssetSource(igrejaDoutrina).uri
const jesusCristoImage = Image.resolveAssetSource(jesusCristo).uri
const larCristaoImage = Image.resolveAssetSource(larCristao).uri
const OEvangelhoImage = Image.resolveAssetSource(OEvangelho).uri
const SantaEscrituraImage = Image.resolveAssetSource(SantaEscritura).uri
const vidaCristaImage = Image.resolveAssetSource(vidaCrista).uri

//Novo
const categoryImage = Image.resolveAssetSource(categoryGod).uri
export const sonGodImage = Image.resolveAssetSource(sonGod).uri

export const categoryImagesAntigo = {
    'Adoração': adoracaoImage,
    'Deus, o Pai': deusOPaiImage,
    'Jesus Cristo': jesusCristoImage,
    'Espirito Santo': espiritoSantoImage,
    'Santa Escritura': SantaEscrituraImage,
    'O Evangelho': OEvangelhoImage,
    'Lar Cristão': larCristaoImage,
    'Igreja e Doutrina': igrejaDoutrinaImage,
    'Cânticos Responsivos': canticosResponsivosImage,
    'Améns': AmenImage,
    'Vida Cristã': vidaCristaImage,
};

export const categoryImagesNovo = {
'Adoração': adoracaoImage,
'Deus, o Pai': deusOPaiImage,
'Jesus Cristo': jesusCristoImage,
'Espirito Santo': espiritoSantoImage,
'Santa Escritura': SantaEscrituraImage,
'O Evangelho': OEvangelhoImage,
'Lar Cristão': larCristaoImage,
'Igreja e Doutrina': igrejaDoutrinaImage,
'Cânticos Responsivos': canticosResponsivosImage,
'Améns': AmenImage,
'Vida Cristã': vidaCristaImage,
};