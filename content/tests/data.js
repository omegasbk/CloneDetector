/**
 * Created by Jomaras.
 * Date: 27.03.12.@15:33
 */
var testData = [];

testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":2,"column":10},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":4}}]},{"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":9},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":9},"source":null},"type":"Literal","value":3}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":2,"column":15},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9},"source":null},"type":"Identifier","name":"a"},"init":{"loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9},"source":null},"type":"Literal","value":3}}]},{"loc":{"start":{"line":2,"column":0},"end":{"line":2,"column":14},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":14},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":2,"column":4},"end":{"line":2,"column":14},"source":null},"type":"Identifier","name":"b"},"init":{"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":14},"source":null},"type":"Literal","value":"test"}}]}]});
testData.push({"loc":{"start":{"line":1,"column":0},"end":{"line":10,"column":1},"source":null},"type":"Program","body":[{"loc":{"start":{"line":1,"column":9},"end":{"line":10,"column":1},"source":null},"type":"FunctionDeclaration","id":{"loc":null,"type":"Identifier","name":"funkcija"},"params":[{"loc":{"start":{"line":1,"column":19},"end":{"line":1,"column":20},"source":null},"type":"Identifier","name":"a"},{"loc":{"start":{"line":1,"column":22},"end":{"line":1,"column":23},"source":null},"type":"Identifier","name":"b"}],"body":{"loc":{"start":{"line":2,"column":0},"end":{"line":9,"column":35},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":3,"column":3},"end":{"line":3,"column":15},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":3,"column":7},"end":{"line":3,"column":15},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":3,"column":7},"end":{"line":3,"column":15},"source":null},"type":"Identifier","name":"c"},"init":{"loc":{"start":{"line":3,"column":11},"end":{"line":3,"column":15},"source":null},"type":"Literal","value":true}}]},{"loc":{"start":{"line":5,"column":3},"end":{"line":5,"column":6},"source":null},"type":"TryStatement","block":{"loc":{"start":{"line":6,"column":3},"end":{"line":7,"column":22},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":7,"column":6},"end":{"line":7,"column":21},"source":null},"type":"VariableDeclaration","kind":"var","declarations":[{"loc":{"start":{"line":7,"column":10},"end":{"line":7,"column":21},"source":null},"type":"VariableDeclarator","id":{"loc":{"start":{"line":7,"column":10},"end":{"line":7,"column":21},"source":null},"type":"Identifier","name":"d"},"init":{"loc":{"start":{"line":7,"column":14},"end":{"line":7,"column":21},"source":null},"type":"Literal","value":"darko"}}]}]},"handlers":[{"loc":{"start":{"line":9,"column":3},"end":{"line":9,"column":8},"source":null},"type":"CatchClause","param":{"loc":{"start":{"line":9,"column":9},"end":{"line":9,"column":10},"source":null},"type":"Identifier","name":"e"},"guard":null,"body":{"loc":{"start":{"line":9,"column":12},"end":{"line":9,"column":34},"source":null},"type":"BlockStatement","body":[{"loc":{"start":{"line":9,"column":14},"end":{"line":9,"column":33},"source":null},"type":"ExpressionStatement","expression":{"loc":{"start":{"line":9,"column":14},"end":{"line":9,"column":33},"source":null},"type":"CallExpression","callee":{"loc":{"start":{"line":9,"column":14},"end":{"line":9,"column":19},"source":null},"type":"Identifier","name":"alert"},"arguments":[{"loc":{"start":{"line":9,"column":20},"end":{"line":9,"column":31},"source":null},"type":"BinaryExpression","operator":"+","left":{"loc":{"start":{"line":9,"column":20},"end":{"line":9,"column":27},"source":null},"type":"Literal","value":"ajme!"},"right":{"loc":{"start":{"line":9,"column":30},"end":{"line":9,"column":31},"source":null},"type":"Identifier","name":"e"}}]}}]}}],"finalizer":null}]},"generator":false,"expression":false}]});