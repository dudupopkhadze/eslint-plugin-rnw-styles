module.exports = {
  create(context) {
    let styleKeys = new Set();

    return {
      // When a CallExpression is found
      CallExpression(node) {
        if (node.callee.name === "createStyleSheet") {
          // Assuming the first argument is an object expression
          const stylesObject = node.arguments[0].body.properties;
          stylesObject.forEach((prop) => {
            if (prop.type === "Property") {
              styleKeys.add(prop.key.name);
            }
          });
        }
      },

      "Program:exit"(node) {
        [...styleKeys].forEach((key) => {
          const keyUsed = isKeyUsed(key, context);
          if (!keyUsed) {
            const loc = findStyleDeclarationNode(node, key)?.loc;
            if (loc)
              context.report({
                loc,
                message: `GOPEER GABAGOOL Style key '${key}' is defined but not used broo.`,
              });
          }
        });
      },
    };

    function findStyleDeclarationNode(node, styleName) {
      return node.tokens.find(
        (t) => t.type === "Identifier" && t.value === styleName
      );
    }

    function isKeyUsed(key, context) {
      const sourceCode = context.getSourceCode();
      const text = sourceCode.getText();
      const regex = new RegExp(`styles\\.${key}`, "g");

      return regex.test(text);
    }
  },
};
