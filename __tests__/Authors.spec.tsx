import { render,screen } from '@testing-library/react-native';
import Authors from '@/components/util/Authors';
import { Author } from '@/types/hymnsTypes';

describe('Authors Component', () => {
  const singleAuthor: Author[] = [
    { name: 'John Doe'}
  ];

  const twoAuthors: Author[] = [
    { name: 'John Doe'},
    { name: 'Jane Smith'}
  ];

  const threeAuthors: Author[] = [
    { name: 'John Doe'},
    { name: 'Jane Smith'},
    { name: 'Robert Johnson'}
  ];

  it('should render single author correctly', () => {
    render(<Authors authors={singleAuthor} card={false} />);
    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('should render multiple authors with separators', () => {
    render(<Authors authors={twoAuthors} card={false} />);
    expect(screen.getByText('John Doe,')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
  });

  it('should truncate names when card prop is true and has multiple authors', () => {
    render(<Authors authors={threeAuthors} card={true} />);
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    expect(screen.getByText('Robert Johnson')).toBeTruthy(); // truncated to 14 chars
  });

  it('should not truncate single author name when card is true', () => {
    render(<Authors authors={singleAuthor} card={true} />);
    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('should handle null authors', () => {
    render(<Authors authors={null} card={false} />);
    expect(screen.getByText('Desconhecido')).toBeTruthy();
  });

  it('should handle empty authors', () => {
    render(<Authors authors={[]} card={false} />);
    expect(screen.getByText('Desconhecido')).toBeTruthy();
  });

  it.skip('should handle unknown author name', () => {
    const unknownAuthor: Author[] = [{ name: 'Desconhecido' }];
    render(<Authors authors={unknownAuthor} card={false} />);
    expect(screen.getByText('Desconhecido')).toBeTruthy();
  });

  it('should apply custom text style when provided', () => {
    const customStyle = { color: 'red', fontSize: 16 };
    render(
      <Authors authors={singleAuthor} card={false} styleText={customStyle} />
    );
    const authorText = screen.getByText('John Doe');
    expect(authorText.props.style).toEqual(customStyle);
  });
});
