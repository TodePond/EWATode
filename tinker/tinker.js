
EWATode.Constant("5").log()
EWATode.Constant("+1").log()
EWATode.Constant("+1").log()
EWATode.Constant("0b0111").log()
EWATode.Constant("0xffff").log()
EWATode.Register("R3").log()
EWATode.Register("R?").log()
EWATode.Preprocessed("hi //lol").log().output.d
EWATode.Symmetry("R000L").log()
EWATode.Label("loop:").log()
EWATode(``).log()
EWATode(`hi`).log()
EWATode(`hi

hi
`).log().d