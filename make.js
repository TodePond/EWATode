import {Habitat} from "./libraries/habitat-import.js"
Habitat.install(window)

// Feel free to edit this file to suit your project

//========//
// Config //
//========//
const BUILD_NAME = "build"
const EXAMPLE_CODE = `
	
	// Your demo code goes here
	
`
//======//
// File //
//======//
const decoder = new TextDecoder("utf-8")
const encoder = new TextEncoder("utf-8")

const readFile = async (path) => {
	console.log("%cReading File: " + path, "color: rgb(0, 128, 255)")
	const data = await Deno.readFile(path)
	const source = decoder.decode(data)
	return source
}

const writeFile = async (path, source) => {
	console.log("%cWriting File: " + path, "color: rgb(0, 255, 128)")
	const data = encoder.encode(source)
	return await Deno.writeFile(path, data)
}

const readDir = async (path) => {
	
	const paths = {header: [], middle: [], footer: []}
	
	const base = {header: [], middle: [], footer: []}
	const embed = {header: [], middle: [], footer: []}
	const module = {header: [], middle: [], footer: []}
	
	const baseHtml = {header: [], middle: [], footer: []}
	const embedHtml = {header: [], middle: [], footer: []}
	const importHtml = {header: [], middle: [], footer: []}
	
	
	
	for await (const entry of Deno.readDir(path)) {
		
		let entryPath = `${path}/${entry.name}`
		if (entry.isDirectory) await readDir(entryPath)
		else {
			let [name, extension] = entry.name.split(".")
			
			if (extension === "mt") {
				const dirtySource = await readFile(entryPath)
				const messySource = dirtySource.split("").filter(c => c !== "\r").join("")
				const source = messySource.split("").map(c => {
					if (c === "\\") return "\\\\\\"
					return c
				}).join("")
				//print(source)
				console.log("%cTranslating File: " + entryPath, "color: rgb(255, 128, 128)")
				let js = MotherTode `${source}`.translation
				js = `// Auto-generated by some MotherTode\n${js}`
				await writeFile(`build/translations/` + name + ".js", js)
				extension = "js"
				entryPath = `build/translations/` + name + ".js"
			}
			const args = name.split("-")
			
			let target = undefined
			if (extension === "js") {
				target = args.includes("import")? module : (args.includes("embed")? embed : base)
			}
			else if (extension === "html") {
				target = args.includes("import")? importHtml : (args.includes("embed")? embedHtml : baseHtml)
			}
			const position = args.includes("footer")? "footer" : (args.includes("header")? "header" : "middle")
			
			const source = await readFile(entryPath)
			target[position].push(source)
			if (target !== module && extension === "js") paths[position].push(entryPath)
		}
	}
	return {base, embed, module, paths, baseHtml, embedHtml, importHtml}
}

//============//
// Read Stuff //
//============//
const {base, embed, module, paths, baseHtml, embedHtml, importHtml} = await readDir("source")

//===============//
// Build Project //
//===============//
const baseSource = [...base.header, ...base.middle, ...base.footer].join("\n\n")
const embedSource = [...embed.header, baseSource, ...embed.middle, ...embed.footer].join("\n\n")
const moduleSource = [...module.header, baseSource, ...module.middle, ...module.footer].join("\n\n")
await writeFile(`build/${BUILD_NAME}-embed.js`, embedSource)
await writeFile(`build/${BUILD_NAME}-import.js`, moduleSource)

//===============//
// Build Example //
//===============//
const exampleTags = [...paths.header, ...paths.middle, ...paths.footer].map(path => `<script src="../${path}"></script>`)
const exampleHtml = [
	...embedHtml.header,
	...baseHtml.header,
	...embedHtml.middle,
	...baseHtml.middle,
	...exampleTags,
	...baseHtml.footer,
	...embedHtml.footer,
].join("\n")

const exampleSource = `<!-- This file shows you how you can use the library by using multiple script tags that link directly to the source files. -->
<!-- It is auto-generated by make.js -->
${exampleHtml}
<script>${EXAMPLE_CODE}</script>`
await writeFile("examples/example-embed-multiple.html", exampleSource)

const exampleSingleHtml = [
	...embedHtml.header,
	...baseHtml.header,
	...embedHtml.middle,
	...baseHtml.middle,
	`<script src="../build/${BUILD_NAME}-embed.js"></script>`,
	...baseHtml.footer,
	...embedHtml.footer,
].join("\n")

const exampleSingleSource = `<!-- This file shows you how you can use the project with a single script tag. -->
<!-- It is auto-generated by make.js -->
${exampleSingleHtml}
<script>${EXAMPLE_CODE}</script>`
await writeFile("examples/example-embed-single.html", exampleSingleSource)

//==================//
// Build Tinkerable //
//==================//
const tinkerSource = `<!-- This file might be useful when you are tinkering with the project. -->
<!-- It is auto-generated by make.js -->
<!-- You can make changes to the project and refresh this file to test them out without needing to remake everything. -->
${exampleHtml}
<body><script src="tinker.js"></script></body>`
await writeFile("tinker/tinker.html", tinkerSource)
