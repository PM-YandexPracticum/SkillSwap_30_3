import { expect, test, describe } from '@jest/globals';
import App from './App';

describe('App', () => {
  test('contains project text', () => {
    const result = App();
    expect(result.props.children).toBe('Проект');
  });
});
