(
	export EWATode
	
	EWATode (
		++ Source
		:: HexNums
	)
	
	HexNums :: HexNum {HexNumsTail}
	HexNumsTail :: [_] HexNum >> ([gap, n]) => ` \\\${n}`
	HexNum :: HexNumDigit HexNumDigit
	HexNumDigit :: /[0-9A-Fa-f]/
	
	Source :: (
		Magic
		MinorVersion
		MajorVersion
		BuildTag
		Metadata
		CodeIndex
		Code
	)
	
	Magic >> "02 03 07 41"
	MinorVersion >> "00 01"
	MajorVersion >> "00 00"
	
	BuildTag :: BuildTagLength BuildTags
	BuildTagLength >> "08"
	BuildTags >> "53 41 4e 44 50 4f 4e 44"
	
	Metadata >> "00"
	CodeIndex >> "00 00"
	Code >> "00 00"
	
)