(
	export EWATode
	
	++ WithoutComments
	:: /[^]/*
	
	WithoutComments :: <
		:: "//" /[^\\\n]/* >> ""
		/[^]/
	>*
	
	Constant (
		:: UInt | SInt | Binary | Hex
		UInt (
			:: /[1-9]/ /[0-9]/*
			?? (n) => n < 2**96-1
		)
		
		SInt (
			:: "+" | "-" /[1-9]/ /[0-9]/*
			?? (n) => n > -(2**95) && n < 2**95-1
		)
		
		Binary :: "0b" ("0" | "1")+
		Hex :: "0x" /[0-9a-f]/+
	)
	
	Register (
		:: Random | Numbered
		Random :: "R?"
		Numbered :: "R" /[0-9]/ | ("1" /[0-4]/)
	)
)