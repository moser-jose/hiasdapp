/* eslint-disable no-console */
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import oldData from '../api/hinario.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function categoryMap() {
  let index = 0
  const category = oldData.categorias.map(categoria => ({
    id: categoria.id,
    name: categoria.categoria,
    subCategories: categoria.sub_categorias.map(subCategoria => ({
      id: (index += 1),
      name: subCategoria.title,
      hymns: subCategoria.hinos,
    })),
  }))
  return category
}

// Function to transform a hymn object
function transformHymn(hymn) {
  const catInfo = categoryMap().find(item => item.name === hymn.categoria)
  return {
    id: hymn.id,
    title: hymn.title,
    englishTitle: hymn.ingles,
    number: hymn.numero,
    numberView: hymn.numero_view,
    biblicalText: hymn.texto_biblico,
    url: 'https://audio.jukehost.co.uk/KbtrsMPAVoUyi8zQiR5noaytwkevpeJe',
    urlOld: hymn.url,
    artwork: hymn.artwork,
    artist: hymn.artist,
    category: catInfo
      ? {
          id: catInfo.id,
          name: catInfo.name,
          subCategory: {
            id:
              catInfo.subCategories.find(sub => sub.name === hymn.sub_categoria)
                ?.id || 1,
            name: hymn.sub_categoria,
          },
        }
      : null,

    lyrics: {
      verses: hymn.estrofes.map((verse, index) => ({
        id: index + 1,
        number: verse.numero,
        verse: verse.estrofe,
      })),
      chorus: hymn.coro.map((coro, index) => ({
        id: index + 1,
        name: coro.nome_coro,
        choir: coro.coro,
      })),
    },

    authors: hymn.autores.map((author, index) => ({
      id: index + 1,
      name: author.nome?.replace(/\([^)]*\)/g, '').trim(),
    })),
  }
}

// Transform the data
const newData = {
  author: oldData.autor,
  github: oldData.github,
  last_update: oldData.ultima_atualizacao,
  url: oldData.url,
  version: oldData.versao,
  app: oldData.app,
  hymns: oldData.hinos.map(transformHymn),
  categories: categoryMap(),
}

// Write the new JSON file
writeFileSync(
  join(__dirname, '../api/hiasd-new1.json'),
  JSON.stringify(newData, null, 2),
  'utf8'
)

console.log('Translation completed successfully!')
