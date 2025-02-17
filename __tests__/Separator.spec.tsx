import { render, screen } from '@testing-library/react-native';
import Separator from '../src/components/util/Separator';
import { Text } from 'react-native';

describe('Separator', () => {
  it('should render the separator with title and children', () => {
    const {debug}=render(
      <Separator title="Test">
        <Text>Child Content</Text>
      </Separator>
    )
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('Child Content')).toBeTruthy();
  });
  it ('should render the separator with only title',()=>
    {
      render(<Separator title="Test"/>)
      expect(screen.getByText('Test')).toBeTruthy();
    })

  it('should render the separator with title and more prop',()=>{
    render(<Separator title="Test" more={true}/>)
    expect(screen.getByText('Test')).toBeTruthy();
  })

  it('should render the separator with title, more prop and children',()=>{
    render(<Separator title="Test" more={true}>
      <Text>Child Content</Text>
    </Separator>)
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('Child Content')).toBeTruthy();
  })

  it('should not render the title prop if it is undefined',()=>{
    render(<Separator/>)
    expect(screen.queryByText('Test')).toBeNull();
  })

}); 