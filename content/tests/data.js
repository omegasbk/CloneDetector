/**
 * Created by Jomaras.
 * Date: 27.03.12.@15:33
 */
var testData = [];

testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":2,"column":10},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":4}}]},{"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":9},"source":null},"type":"Literal","value":3}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":2,"column":15},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":3}}]},{"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":14},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":14},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":14},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":14},"source":null},"type":"Literal","value":"test"}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":7,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":5}}]},{"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":9},"source":null},"type":"Literal","value":5}}]},{"loc":{"start":{"line":4,"column":0},"end":{"line":6,"column":7},"source":null},"type":"IfStatement","test":{"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":10},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":4,"column":5},"end":{"line":4,"column":6},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":4,"column":9},"end":{"line":4,"column":10},"source":null},"type":"Identifier","name":"b"}},"consequent":{"loc":{"start":{"line":5,"column":0},"end":{"line":6,"column":7},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":6},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":6},"source":null},"type":"BinaryExpression","operator":"-","left":{"loc":{"start":{"line":6,"column":3},"end":{"line":6,"column":4},"source":null},"type":"Literal","value":2},"right":{"loc":{"start":{"line":6,"column":5},"end":{"line":6,"column":6},"source":null},"type":"Literal","value":3}}}]},"alternate":null}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":6,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":5}}]},{"loc":{"start":{"line":3,"column":0},"end":{"line":5,"column":10},"source":null},"type":"IfStatement","test":{"loc":{"start":{"line":3,"column":5},"end":{"line":3,"column":11},"source":null},"type":"BinaryExpression","operator":"==","left":{"loc":{"start":{"line":3,"column":5},"end":{"line":3,"column":6},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":3,"column":10},"end":{"line":3,"column":11},"source":null},"type":"Literal","value":5}},"consequent":{"loc":{"start":{"line":4,"column":0},"end":{"line":5,"column":10},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":9},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":9},"source":null},"type":"AssignmentExpression","operator":"=","left":{"loc":{"start":{"line":5,"column":4},"end":{"line":5,"column":5},"source":null},"type":"Identifier","name":"a"},"right":{"loc":{"start":{"line":5,"column":8},"end":{"line":5,"column":9},"source":null},"type":"Literal","value":6}}}]},"alternate":null}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":6},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":6},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":6},"source":null},"type":"UnaryExpression","operator":"void","argument":{"loc":{"start":{"line":1,"column":5},"end":{"line":1,"column":6},"source":null},"type":"Literal","value":2},"prefix":true}}]});