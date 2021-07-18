import { SearchBarIOS } from '../SearchBar-ios';
import { commonTests, commonPlatformTest } from './common';

describe('iOS SearchBar component', () => {
  commonTests(SearchBarIOS);
  commonPlatformTest(SearchBarIOS);
});
