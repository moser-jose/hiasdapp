import { render, screen} from "@testing-library/react-native";
import { ListHymns } from "../src/components/util/ListHymns";
import { hymnsWithArtwork } from "./data/DataMock";

describe("ListHymns", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the list of hymns with correct data", () => {
    render(<ListHymns hymns={hymnsWithArtwork} />);
    
    expect(screen.getByText("Ó Deus de Amor")).toBeTruthy();
    
    hymnsWithArtwork.slice(0, 9).forEach(hymn => {
      expect(screen.getByText(hymn.title)).toBeTruthy();
    });
  });

  it("should show empty state when no hymns are provided", () => {
    render(<ListHymns hymns={[]} />);
    expect(screen.getByText("No hymns found")).toBeTruthy();
  });
});
