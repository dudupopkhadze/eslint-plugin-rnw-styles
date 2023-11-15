# ESLint Rule: RNW-Styles

This ESLint rule checks for unused style keys defined in `getStyles` (can be refactored to different function) functions within React components. It helps maintain a cleaner codebase by ensuring that all defined styles are used.

## Rule Details

This rule aims to identify style keys declared in `getStyles` functions that are not used in the corresponding React component file. It is particularly useful in large projects where managing styles can become complex, and unused styles may accumulate over time.

### Examples of **incorrect** code for this rule:

```jsx
const getStyles = createStyleSheet(({ color, size }) => ({
  container: {
    // styles
  },
  unusedStyle: {
    // styles
  },
}));

const Component = () => {
  const styles = useStyleSheet(getStyles);
  return <View style={styles.container}></View>;
};
```
