// Auto-generated by some MotherTode
(() => {

			const global = window
			const scope = {}
			const term = (() => {
	global.EWATode = Term.term('EWATode', scope)
	return Term.subTerms(Term.string(''), [
['EWATode', Term.chain(Term.term('EWATode.Source', scope), Term.term('EWATode.HexNums', scope))],
['HexNums', Term.list([Term.term('HexNums.HexNum', scope), Term.maybe(Term.many(Term.term('HexNums.HexNumsTail', scope)))])],
['HexNumsTail', Term.emit(Term.list([Term.maybe(Term.many(Term.regExp(/ |	/))), Term.term('HexNumsTail.HexNum', scope)]), ([gap, n]) => ` ${n}`)],
['HexNum', Term.list([Term.term('HexNum.HexNumDigit', scope), Term.term('HexNum.HexNumDigit', scope)])],
['HexNumDigit', Term.regExp(/[0-9A-Fa-f]/)],
['Source', Term.list([
		Term.term('Source.Magic', scope),
		Term.term('Source.MinorVersion', scope),
Term.term('Source.MajorVersion', scope),
Term.term('Source.BuildTag', scope),
Term.term('Source.Metadata', scope),
Term.term('Source.CodeIndex', scope),
Term.term('Source.Code', scope)
	])],
['Magic', Term.emit(Term.string(''), "02 03 07 41")],
['MinorVersion', Term.emit(Term.string(''), "00 01")],
['MajorVersion', Term.emit(Term.string(''), "00 00")],
['BuildTag', Term.list([Term.term('BuildTag.BuildTagLength', scope), Term.term('BuildTag.BuildTags', scope)])],
['BuildTagLength', Term.emit(Term.string(''), "08")],
['BuildTags', Term.emit(Term.string(''), "53 41 4e 44 50 4f 4e 44")],
['Metadata', Term.emit(Term.string(''), "00")],
['CodeIndex', Term.emit(Term.string(''), "00 00")],
['Code', Term.emit(Term.string(''), "00 00")]
])
})()
			for (const key in term) {
				scope[key] = term[key]
			}
			return term
		
})()