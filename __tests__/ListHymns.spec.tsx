import { render, screen} from "@testing-library/react-native";
import { ListHymns } from "../src/components/util/ListHymns";
import { hymnsWithArtwork } from "./mocks/DataMock";

// Mock react-native-track-player
const mockLoad = jest.fn();
const mockPlay = jest.fn();

jest.mock('react-native-track-player', () => ({
  load: mockLoad,
  play: mockPlay,
  useIsPlaying: () => ({ playing: false }),
  useActiveTrack: () => null,
  __esModule: true,
  default: {
    load: mockLoad,
    play: mockPlay,
  },
}));

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
