(
	export EWATode
	
	EWATode :: Magic
	Magic :: HexNums ++ >> "02 03 07 41"
	HexNums ++ Strip :: HexNum+
	HexNum :: HexNumDigit HexNumDigit >> ({output}) => parseInt(output, 16).toString(2).padStart(8, "0")
	HexNumDigit :: /[0-9A-F]/
	
	Strip :: <
		:: " " >> ""
		/[^]/
	>+
)