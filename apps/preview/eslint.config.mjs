import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
	...nextVitals,
	...nextTs,
	{
		rules: {
			"no-restricted-syntax": [
				"error",
				{
					selector:
						"ImportDeclaration[source.value='react'] ImportSpecifier[imported.name='useCallback']",
					message:
						"useCallback is banned in this project. Prefer simpler data flow or component boundaries.",
				},
				{
					selector:
						"ImportDeclaration[source.value='react'] ImportSpecifier[imported.name='useMemo']",
					message:
						"useMemo is banned in this project. Prefer simpler data flow or moving work out of render.",
				},
				{
					selector:
						"CallExpression[callee.object.name='React'][callee.property.name='useCallback']",
					message:
						"React.useCallback is banned in this project. Prefer simpler data flow or component boundaries.",
				},
				{
					selector:
						"CallExpression[callee.object.name='React'][callee.property.name='useMemo']",
					message:
						"React.useMemo is banned in this project. Prefer simpler data flow or moving work out of render.",
				},
				{
					selector:
						"VariableDeclarator[id.type='ObjectPattern'][init.name='React'] Property[key.name='useCallback']",
					message:
						"Destructuring React.useCallback is banned in this project.",
				},
				{
					selector:
						"VariableDeclarator[id.type='ObjectPattern'][init.name='React'] Property[key.name='useMemo']",
					message: "Destructuring React.useMemo is banned in this project.",
				},
			],
		},
	},
];

export default eslintConfig;
