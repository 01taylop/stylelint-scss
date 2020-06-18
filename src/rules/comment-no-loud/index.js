import { utils } from "stylelint";
import { namespace } from "../../utils";

export const ruleName = namespace("comment-no-loud");

export const messages = utils.ruleMessages(ruleName, {
  expected: "Expected // for comments instead of /*"
});

function rule(primary) {
  return (root, result) => {
    const validOptions = utils.validateOptions(result, ruleName, {
      actual: primary
    });

    if (!validOptions) {
      return;
    }

    root.walkComments(comment => {
      if (isLoudComment(comment)) {
        utils.report({
          message: messages.expected,
          node: comment,
          result,
          ruleName
        });
      }
    });
  };
}

function isLoudComment(comment) {
  const regex = new RegExp(/^[ \t\n]*\/\*/);

  const splitComment = comment.source.input.css.split("\n");
  const commentFirstLine = splitComment[comment.source.start.line - 1];

  return regex.test(commentFirstLine);
}

export default rule;
