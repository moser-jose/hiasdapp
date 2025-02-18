import { render, screen } from '@testing-library/react-native'
import Authors from '@/components/util/Authors'
import { Author } from '@/types/hymnsTypes'
describe('Authors Component', () => {
  const singleAuthor: Author[] = [{ name: 'John Doe' }]

  const twoAuthors: Author[] = [{ name: 'John Doe' }, { name: 'Jane Smith Justin John' }]

  const threeAuthors: Author[] = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'Robert Johnson' },
  ]

  it('should render single author correctly', () => {
    render(<Authors authors={singleAuthor} card={false} />)
    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  it('should render multiple authors with separators', () => {
    render(<Authors authors={twoAuthors} card={false} />)
    expect(screen.getByText('John Doe,')).toBeTruthy()
    expect(screen.getByText('Jane S. J. John')).toBeTruthy()
  })

  it('should truncate author names to 14 characters when card is true and has two authors', () => {
    render(<Authors authors={twoAuthors} card={true} />)
    expect(screen.getByText('John Doe,')).toBeTruthy()
    expect(screen.getByText('Jane S. J. Joh...')).toBeTruthy()
  })

  it('should truncate names when card prop is true and has multiple authors', () => {
    render(<Authors authors={threeAuthors} card={true} />)
    expect(screen.getByText('John Doe,')).toBeTruthy()
    expect(screen.getByText('Jane Smith,')).toBeTruthy()
    expect(screen.getByText('Robert Johnson')).toBeTruthy()
  })

  it('should not truncate single author name when card is true', () => {
    render(<Authors authors={singleAuthor} card={true} />)
    expect(screen.getByText('John Doe')).toBeTruthy()
  })

  it('should handle null authors', () => {
    render(<Authors authors={null} card={false} />)
    expect(screen.getByText('Desconhecido')).toBeTruthy()
  })

  it('should handle empty authors', () => {
    render(<Authors authors={[]} card={false} />)
    expect(screen.getByText('Desconhecido')).toBeTruthy()
  })

  it('should handle unknown author name', () => {
    const unknownAuthor: Author[] = [{ name: 'Desconhecido' }]
    render(<Authors authors={unknownAuthor} card={false} />)
    expect(screen.getByText('Desconhecido')).toBeTruthy()
  })

  it('should handle unknown author name null', () => {
    const unknownAuthor: Author[] = [{ name: null }]
    render(<Authors authors={unknownAuthor} card={false} />)
    expect(screen.getByText('Desconhecido')).toBeTruthy()
  })

  it('should apply custom text style when provided', () => {
    const customStyle = { color: 'red', fontSize: 16 }
    render(<Authors authors={singleAuthor} card={false} styleText={customStyle} />)
    const authorText = screen.getByText('John Doe')
    expect(authorText.props.style).toEqual(customStyle)
  })

  it('should apply custom text style to all authors when multiple authors', () => {
    const customStyle = { color: 'blue', fontSize: 18 }
    render(<Authors authors={twoAuthors} card={false} styleText={customStyle} />)
    const firstAuthor = screen.getByText('John Doe,')
    const secondAuthor = screen.getByText('Jane S. J. John')
    expect(firstAuthor.props.style).toEqual(customStyle)
    expect(secondAuthor.props.style).toEqual(customStyle)
  })

  it('should apply custom text style with truncated text when card is true', () => {
    const customStyle = { color: 'green', fontSize: 14 }
    render(<Authors authors={twoAuthors} card={true} styleText={customStyle} />)
    const firstAuthor = screen.getByText('John Doe,')
    const secondAuthor = screen.getByText('Jane S. J. Joh...')
    expect(firstAuthor.props.style).toEqual(customStyle)
    expect(secondAuthor.props.style).toEqual(customStyle)
  })

  it('should apply custom text style to unknown author text', () => {
    const customStyle = { color: 'purple', fontSize: 20 }
    render(<Authors authors={null} card={false} styleText={customStyle} />)
    const unknownText = screen.getByText('Desconhecido')
    expect(unknownText.props.style).toEqual(customStyle)
  })

  it('should handle undefined result from shortName function', () => {
    const authorWithSpecialName: Author[] = [{ name: '123' }]
    render(<Authors authors={authorWithSpecialName} card={false} />)
    expect(screen.getByText('Desconhecido')).toBeTruthy()
  })
})
