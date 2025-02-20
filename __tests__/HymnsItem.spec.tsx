import { render, screen, fireEvent } from '@testing-library/react-native'
import HymnsItem from '@/components/util/HymnsItem'
import { hymnsWithArtwork } from './data/DataMock'

describe('Hymns Item', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle hymn selection correctly', async () => {
    const mockHymnSelect = jest.fn()
    render(
      <HymnsItem hymn={hymnsWithArtwork[0]} onHymnSelect={mockHymnSelect} />
    )

    const expectedTrack = {
      id: hymnsWithArtwork[0].number,
      number: hymnsWithArtwork[0].number,
      numberView: hymnsWithArtwork[0].numberView,
      englishTitle: hymnsWithArtwork[0].englishTitle,
      authors: hymnsWithArtwork[0].authors,
      title: hymnsWithArtwork[0].title,
      url: hymnsWithArtwork[0].url,
      artwork: hymnsWithArtwork[0].artwork,
      artist: hymnsWithArtwork[0].artist,
    }

    const playButton = screen.getByTestId(
      `play-button-${hymnsWithArtwork[0].number}`
    )
    fireEvent.press(playButton)

    expect(mockHymnSelect).toHaveBeenCalledWith(expectedTrack)
  })
})
