(
	export EWATode
	
	++ Preprocessed
	:: Line { "\n" Line } EOF
	
	Preprocessed <
		:: "//" /[^\n]/* >> ""
		
		/[^]/
	>*
	
	Line :: [_] Instruction [_]
	Instruction (
		:: "hi"
	)
	
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
	
	Symmetry <
		:: "R000L"
		:: "R090L"
		:: "R180L"
		:: "R270L"
		:: "R000R"
		:: "R090R"
		:: "R180R"
		:: "R270R"
		:: "ALL"
	>
	
	Label :: /[a-zA-Z0-9]/+ ":"
	
)