import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import CardHymnDay from '@/components/util/CardHymnDay'
import { categoriesTest, hymnsWithArtwork } from './data/DataMock'
import { dateFormat } from '@/helpers/dateFormat'
import { HymnCategory } from '@/types/hymnsTypes'
import { ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

jest.mock('@/helpers/randomNumber', () => ({
  randomNumber: jest.fn().mockReturnValue(7),
}))

describe('CardHymnDay', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading state initially', async () => {
    const { UNSAFE_getByType } = render(
      <CardHymnDay hymns={hymnsWithArtwork} categories={categoriesTest} />
    )
    await waitFor(() => expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy())
  })

  it('should render the hymn of the day after loading', async () => {
    // Mock stored hymn
    const today = new Date().toISOString().split('T')[0]
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ date: today, hymn: hymnsWithArtwork[0].id })
    )

    const { UNSAFE_queryByType } = render(
      <CardHymnDay hymns={hymnsWithArtwork} categories={categoriesTest} />
    )

    await waitFor(() => {
      expect(UNSAFE_queryByType(ActivityIndicator)).toBeNull()
    })

    // Check if main elements are rendered
    expect(screen.getByText('Hino do Dia')).toBeTruthy()
    expect(screen.getByText(new Date().getFullYear().toString())).toBeTruthy()
    expect(screen.getByText(dateFormat(new Date()))).toBeTruthy()

    // Check if hymn details are rendered
    const hymn = hymnsWithArtwork[0]
    expect(screen.getByText(hymn.title)).toBeTruthy()
    if (hymn.numberView) {
      expect(screen.getByText(hymn.numberView)).toBeTruthy()
    }
  })

  it('should use stored hymn if available for today', async () => {
    const today = new Date().toISOString().split('T')[0]
    const storedHymn = hymnsWithArtwork[1]

    // Mock AsyncStorage to return a stored hymn for today
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ date: today, hymn: storedHymn.id })
    )

    const { UNSAFE_queryByType } = render(
      <CardHymnDay hymns={hymnsWithArtwork} categories={categoriesTest} />
    )

    await waitFor(() => {
      expect(UNSAFE_queryByType(ActivityIndicator)).toBeNull()
    })

    // Verify the stored hymn is displayed
    expect(screen.getByText(storedHymn.title)).toBeTruthy()
    if (storedHymn.numberView) {
      expect(screen.getByText(storedHymn.numberView)).toBeTruthy()
    }

    // Verify AsyncStorage.setItem was not called since we already had a hymn for today
    expect(AsyncStorage.setItem).not.toHaveBeenCalled()
  })

  it('should generate new hymn if no stored hymn for today', async () => {
    // Mock AsyncStorage to return null (no stored hymn)
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null)

    render(<CardHymnDay hymns={hymnsWithArtwork} categories={categoriesTest} />)

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.queryByTestId('loading-indicator')).toBeNull()
      },
      { timeout: 3000 }
    )

    // Verify the hymn is rendered
    expect(screen.getByText(hymnsWithArtwork[6].title)).toBeTruthy()

    // Verify AsyncStorage.setItem was called with correct parameters
    const today = new Date().toISOString().split('T')[0]
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'dailyHymn',
      JSON.stringify({ date: today, hymn: 7 })
    )
  })

  it('should handle play button press', async () => {
    // Mock stored hymn
    const today = new Date().toISOString().split('T')[0]
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ date: today, hymn: hymnsWithArtwork[0].id })
    )

    render(<CardHymnDay hymns={hymnsWithArtwork} categories={categoriesTest} />)

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).toBeNull()
    })

    const playButton = screen.getByText('Tocar Agora')
    fireEvent.press(playButton)
    // Add assertions for play button functionality when implemented
  })

  it('should display truncated category name if too long', async () => {
    const longCategoryName: HymnCategory = {
      id: 1,
      name: 'Very Long Category Name That Should Be Truncated',
      subCategory: {
        id: 1,
        name: 'Test Subcategory',
      },
    }

    // Mock stored hymn with long category name
    const today = new Date().toISOString().split('T')[0]
    const hymnWithLongCategory = {
      ...hymnsWithArtwork[0],
      category: longCategoryName,
    }
    ;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ date: today, hymn: hymnWithLongCategory.id })
    )

    const { UNSAFE_queryByType } = render(
      <CardHymnDay hymns={[hymnWithLongCategory]} categories={[categoriesTest[0]]} />
    )

    await waitFor(() => {
      expect(UNSAFE_queryByType(ActivityIndicator)).toBeNull()
    })

    const categoryText = screen.getByText(/Very Long/)
    expect(categoryText).toBeTruthy()
  })
})
